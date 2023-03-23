exports.handler = async (event) => {

    
    const response = {
        headers: {
            "Content-Type": "text/html; charset=utf-8"
        },
        statusCode: 200,
        body: `
        <html> 
        <head> 
        <title> Hellow Sync triggered fn </title>
        <style> html, body {
            margin: 0; padding: 0;
            font-family: arial; font-weight: 700; font-size: 3em;
            text-align: center;
        }
        </style> 
        </head>
        <body> 
          <p> Hellow from Lambda sync func </p> 
        </body>
        </html>
    
        `,
    };
    return response;
};
);


// async lambda.
const  AWS= require ('aws-sdk');
const sns = new AWS.SNS({apiVersion: '2010-03-31'});
const here = 'here is a second version';

const TOPIC = process.env.TOPIC;

exports.handler = async (event) =>{
    const params = {
        Message: JSON.stringify(event),
        Subject: 'Here is my lambda', 
        TopicArn: TOPIC
    }
    
    const res = await sns.publish(params).promise();
    const response = {
        statusCode: 200, 
        body: JSON.stringify(res)
    };
    
    return response;
};
