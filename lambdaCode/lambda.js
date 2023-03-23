const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (event.routeKey) {// httpMethod.
        case 'GET':
         body= await dynamo.scan({
            TableName:'courseTable'

         })
         .promise()
         break;
      case "DELETE /course/{id}":
        await dynamo
          .delete({
            TableName: "courseTable",
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        body = `Deleted course ${event.pathParameters.id}`;
        break;
      case "GET /course/{id}":
        body = await dynamo
          .get({
            TableName: "courseTable",
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        break;
      case "GET /course":
        body = await dynamo.scan({ TableName: "courseTable" }).promise();
        break;
      case "PUT /course":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "courseTable",
            Item: {
              id: requestJSON.id,
              price: requestJSON.price,
              name: requestJSON.name,
            },
          })
          .promise();
        body = `Put item ${requestJSON.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};




/*

/* const AWS = require('aws-sdk');
    const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
let result ;
const table = 'courseTable';

exports.handler = async (event) => {

const body = JSON.parse(event.body); 
const method = event.httpMethod;
const courseName = event.queryStringParameters?.courseName
const path = event.path;
const teacherName = event.queryStringParameters?.teacherName;
    console.log(JSON.stringify(event));
  if (method ==='GET') {
      if (courseName){
          const course1 = {
              TableName: table,
              key: {
                  'courseName': courseName
              }
          }
          await dynamodb.getItem(course1).promise();
           const response1 = {
        statusCode: 200,
        body: JSON.stringify('course1'),
          
    };
          return response1;
          
               
             } else if (teacherName){
              console.log('here is the teacherName')
          } else {
              console.log('return all records in the table.')
           }
     
   } else if (method === 'POST'){
    const saveItem = {
    TableName: 'courseTable',
    Item: {
        'courseId': {
            S: "CS460"
        }, 
        'courseName':{S: "NOCLue"}, 
        'teacherName': {
            S: "Lei"
        },
        'students': {
            SS: ["Bipin", "Bex", "Michael"]
        },
        'monthYear': {
            S: "July,2022 "
            
        }
    }
}
      
       await dynamodb.putItem(saveItem).promise();
   
   

  }
 
 // if (resource ==='course/{id}'){if (method ==='GET'){do somethi}}
    const response = {
        statusCode: 200,
        body: JSON.stringify('An item is saved successfully'),
    };
  
    return response;
};


/*

const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

exports.handler = async (event) => {
//  const body = JSON.parse(event.body); 
//   //let result;
//   const table = "courseTable";
//  if (event.httpMethod ==='POST'){
//      const params = {
//           TableName: table,
//           Item: {
//             'courseId': { S: body.courseId},
//             'courseName': { S: body.courseName },
//             'teacherName': { S: body.teacherName },
//             'students': { SS:body.students },
//             'monthYear': { S: body.monthYear}
//           }
//         };

//       await dynamodb.putItem(params).promise();
   
// }


const saveItem = {
    TableName: 'courseTable',
    Item: {
        'courseId': {
            S: "CS10"
        }, 
        'courseName':{S: "STC"}, 
        'teacherName': {
            S: "lJS"
        },
        'students': {
            SS: ["Bipin", "Bex", "Michael"]
        },
        'monthYear': {
            S: "July,2022 "
            
        }
    }
};

await dynamodb.putItem(saveItem).promise();
// let reuslt = await dynamodb.getItem({
//               TableName: 'courseTable',
//               key: {
//                   'courseName': event.body.courseName
//               }
//           }).promise();
      
  const response = {
    statusCode: 200,
   body: JSON.stringify(saveItem)
   //body: 'Hello lambda'
};
  return response;
};


*/
