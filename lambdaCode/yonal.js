const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = "courseTable";
const coursePath = "/course";

exports.handler = async function (event) {
  console.log("Request event: ", event);
  let response;
  switch (true) {
    case event.httpMethod === "GET" && event.path === coursePath:
      response = await getCourse(event.queryStringParameters.courseID);
      break;
    case event.httpMethod === "GET" && event.path === coursePath:
      response = await getCourses();
      break;
    case event.httpMethod === "POST" && event.path === coursePath:
      response = await createCourse(JSON.parse(event.body));
      break;
    case event.httpMethod === "PATCH" && event.path === coursePath:
      const requestBody = JSON.parse(event.body);
      response = await updateCourse(
        requestBody.courseID,
        requestBody.updateKey,
        requestBody.updateValue
      );
      break;
    case event.httpMethod === "DELETE" && event.path === coursePath:
      response = await deleteCourse(JSON.parse(event.body).courseID);
      console.log(response)
      break;
    default:
      response = sendResponse(404, "404 Not Found");
  }
  return response;
};

async function getCourse(courseID) {
  const params = {
    TableName: tableName,
    Key: {
      courseID: courseID,
    },
  };
  return await dynamodb
    .get(params)
    .promise()
    .then(
      (response) => {
        return sendResponse(200, response.Item);
      },
      (err) => {
        console.error(err);
      }
    );
}

async function getCourses() {
  const params = {
    TableName: tableName,
  };
  const allCourses = await recordsScan(params, []);
  const body = {
    courses: allCourses,
  };
  return sendResponse(200, body);
}

async function recordsScan(scanParams, itemArray) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await recordsScan(scanParams, itemArray);
    }
    return itemArray;
  } catch (err) {
    console.error(err);
  }
}

async function createCourse(requestBody) {
  const params = {
    TableName: tableName,
    Item: requestBody,
  };
  return await dynamodb
    .put(params)
    .promise()
    .then(
      () => {
        const body = {
          Message: "SUCCESS",
          Item: requestBody,
        };
        return sendResponse(200, body);
      },
      (err) => {
        console.error(err);
      }
    );
}

async function updateCourse(courseID, updateKey, updateValue) {
  const params = {
    TableName: tableName,
    Key: {
      courseID: courseID,
    },
    UpdateExpression: `set ${updateKey} = :value`,
    ExpressionAttributeValues: {
      ":value": updateValue,
    },
    ReturnValues: "UPDATED_NEW",
  };
  return await dynamodb
    .update(params)
    .promise()
    .then(
      (response) => {
        const body = {
          Message: "SUCCESS",
          UpdatedAttributes: response,
        };
        return sendResponse(200, body);
      },
      (err) => {
        console.error(err);
      }
    );
}

async function deleteCourse(courseID) {
  const params = {
    TableName: tableName,
    Key: {
      courseID: courseID,
    },
    ReturnValues: "ALL_OLD",
  };
  return await dynamodb
    .delete(params)
    .promise()
    .then(
      (response) => {
        const body = {
          Message: "SUCCESS",
          Item: response,
        };
        return sendResponse(200, body);
      },
      (err) => {
        console.error(err);
      }
    );
}

function sendResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}