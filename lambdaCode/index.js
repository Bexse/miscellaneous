const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

exports.handler = async (event) => {
  let result;
  const table = "courseTable";
  const response = {
    statusCode: 200,
    result: JSON.stringify(result),
  };

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    //create an item in the table.
    switch (event.httpMethod) {
      case "POST":
        const params = {
          TableName: table,
          Item: {
            courseId: { S: "CS415" },
            courseName: { S: "Database" },
            teacherName: { S: "Obina" },
            students: { SS: ["Bex", "Aradom", "Yonas"] },
            monthYear: { S: "July, 2022" },
          },
        };

        result = await dynamodb.putItem(params).promise();
        break;
      default:
    }
  } catch (err) {
    result = err.message;
  }

  return response;
};

// get an item by id

/*

"use strict";

const { sendResponse } = require("../functions/index");
const dynamoDb = require("../config/dynamoDb");

module.exports.getPost = async event => {
  try {
    const { id } = event.pathParameters;
    const params = {
      TableName: process.env.DYNAMO_TABLE_NAME,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id
      },
      Select: "ALL_ATTRIBUTES"
    };

    const data = await dynamoDb.query(params).promise();
    if (data.Count > 0) {
      return sendResponse(200, { item: data.Items });
    } else {
      return sendResponse(404, { message: "Post not found" });
    }
  } catch (e) {
    return sendResponse(500, { message: "Could not get the post" });
  }
};


*/
