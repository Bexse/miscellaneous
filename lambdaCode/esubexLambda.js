const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});

function sendRes(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = "courseTable";
const coursePath = "/course";
const path = "/course/{courseId}";

exports.handler = async function (event) {
  let res;
  switch (true) {
    case event.httpMethod === "GET" && event.resource === path:
      res = await getCourse(event.pathParameters.courseId);
      console.log(res);
      break;

    case event.httpMethod === "GET" && event.path === coursePath:
      res = await getCourses();
      break;
    case event.httpMethod === "POST" && event.path === coursePath:
      res = await saveCourse(JSON.parse(event.body));
      break;
    case event.httpMethod === "PATCH" && event.resource === path:
      const requestBody = JSON.parse(event.body);

      res = await updateCourse(
        event.pathParameters.courseId,
        requestBody.updateKey,
        requestBody.updateValue
      );
      break;
    case event.httpMethod === "DELETE" && event.resource === path:
      res = await deleteCourse(event.pathParameters.courseId);
      break;
    default:
      res = sendRes(404, "404 NOT Found");
  }
  return res;
};

async function getCourse(courseId) {
  const params = {
    TableName: tableName,
    Key: {
      courseId: courseId,
    },
  };
  return await dynamodb
    .get(params)
    .promise()
    .then(
      (response) => {
        return sendRes(200, response.Item);
      },
      (err) => {
        console.log(err);
      }
    );
}

async function saveCourse(reqBody) {
  const params = {
    TableName: tableName,
    Item: reqBody,
  };
  return await dynamodb
    .put(params)
    .promise()
    .then(
      () => {
        const body = {
          Message: "SUCCESS",
          Item: reqBody,
        };
        return sendRes(200, body);
      },
      (err) => {
        console.error(err);
      }
    );
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

async function getCourses() {
  const params = {
    TableName: tableName,
  };
  const allCourses = await recordsScan(params, []);
  const body = {
    courses: allCourses,
  };
  return sendRes(200, body);
}

async function deleteCourse(courseId) {
  const params = {
    TableName: tableName,
    Key: {
      courseId: courseId,
    },
    ReturnValues: "ALL_OLD",
  };
  return await dynamodb
    .delete(params)
    .promise()
    .then(
      (response) => {
        const body = {
          Operation: "DELETE",
          Message: "SUCCESS",
          Item: response,
        };
        return sendRes(200, body);
      },
      (err) => {
        console.log(err);
      }
    );
}

async function updateCourse(courseId, updateKey, updateValue) {
  const params = {
    TableName: tableName,
    Key: {
      courseId: courseId,
    },
    UpdateExpression: `SET ${updateKey} = :value`,
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
        return sendRes(200, body);
      },
      (err) => {
        console.error(err);
      }
    );
}
