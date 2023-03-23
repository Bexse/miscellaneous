/*const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = "project-messageTable";
const coursePath = "/contact";

exports.handler = async function (event) {
  const invalidreq = {
    statusCode: 400,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(invalidreq),
  };

  if (event.httpMethod === "POST" && event.path === coursePath) {
    try {
      const body = JSON.parse(event.body);
      if (!body || !body.email || !body.guestName || !body.message) {
        return invalidreq;
      }

      const params = {
        TableName: tableName,
        Item: {
          messageTitle: { S: body.messageTitle },
          email: { S: body.email },
          phone: { S: body.phone },
          message: {
            S: body.message,
          },
          guestName: { S: body.guestName },
        },
      };

      await dynamodb.put(params).promise();
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify("sucess"),
      };
    } catch (error) {
      console.log("here is an error");
    }
  } else {
    return invalidreq;
  }
};

*/

/*

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const sns = new AWS.SNS({ apiVersion: '2010-03-31' });
const tableName = 'project-contact-message-Table';
const topicArn = 'arn:aws:sns:us-east-1:090562646978:project-messageSNS';

exports.handler = async (event) => {
    console.log('new message from a visitor ' + JSON.stringify(event));
    const invalidReq = {
        statusCode: 400,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true

        },
        body: JSON.stringify('Invalid Request')
    };
    if (event.httpMethod === 'POST') {
        if (event.path === '/contact') {
            try {
                const body = JSON.parse(event.body);
                if (!body || !body.Email || !body.GuestName || !body.Message) {
                    console.log("Invalid request - Required params are missing.");
                    return invalidReq;
                }
                let emailSubject = `${body.guestName} messaged you on esubex.com`;
                const snsParams = {
                    Message: JSON.stringify({
                        subject: body.messageTitle,
                        email: body.email,
                        phone: body.phone,
                        messgae: body.message
                    }),
                    Subject: emailSubject,
                    TopicArn: topicArn
                };

                const res = await sns.publish(snsParams).promise();
                console.log('sucessfully sent email ' + JSON.stringify(res));
                // save data to db =>need to be modified tho.

                const saveParams = {
                    TableName: tableName,
                    Item: {
                        "messageTitle": { S: body.messageTitle },
                        "email": { S: body.email },
                        "phone": { S: body.phone },
                        "message": { S: body.message },
                        "guestName": { S: body.guestName }
                    }
                };

                await dynamodb.putItem(saveParams).promise();
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true

                    },
                    body: JSON.stringify('Success!')
                };

            }
            catch (err) {
                const msg = 'System Error while sending SNS or Saving DynamoDB';
                console.log(msg + JSON.stringify(err));

                return {
                    statusCode: 500,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true

                    },
                    body: JSON.stringify(msg)
                };

            }

        }
        else {
            return invalidReq;
        }

    }

};


*/

