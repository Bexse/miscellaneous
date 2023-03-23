const AWS = require("aws-sdk");
const s3 = new AWS.S3();
exports.handler = async (event) => {
  const params = {
    Bucket: "lab10cs516bucket",
    Key: "Screen Shot 2022-07-08 at 9.41.06 PM.png",
  };

  const presignedURl = s3.getSignedUrl("getObject", params);

  const response = {
    statusCode: 200,
    body: JSON.stringify(presignedURl),
  };
  return response;
};

const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const BUCKET_NAME = process.env.BUCKET_NAME;
exports.handler = async (event) => {
  // const params = {
  //     Bucket: 'lab10cs516bucket',
  //     Key: 'Screen Shot 2022-07-08 at 9.41.06 PM.png',

  // };

  // const upload = {
  //      Bucket: 'lab10cs516bucket',
  //      Key: 'key',
  //      body: 'here it is'
  // }
  // //const presignedURl = s3.getSignedUrl('getObject', params);
  // const putsigneUrl = s3.getSignedUrl('putObject', upload)
  //     const response = {
  //         statusCode: 200,
  //         body: JSON.stringify(putsigneUrl),
  //     };
  //     return response;
  // };

  try {
    let body = JSON.parse(event.body);
    let objectKey = body.objectKey;
    let s3Action = body.s3Action; //get/put etc
    let contentType = body.contentType;
    let expirationTime = 60; //1 min to test

    console.log(
      `BucketName: ${BUCKET_NAME}, ObjectKey: ${objectKey}, S3Action: ${s3Action}, expirationTime: ${expirationTime}, contentType: ${contentType}`
    );
    let params = {
      Bucket: BUCKET_NAME,
      Key: objectKey,
      Expires: expirationTime,
    };

    if (s3Action === "putObject") {
      params.ContentType = contentType;

      expirationTime = 60 * 5;
      params.Expires = expirationTime;
    }

    const signedUrl = s3.getSignedUrl(s3Action, params);

    return {
      statusCode: 200,
      body: JSON.stringify(signedUrl),
    };
  } catch (error) {
    console.log(`Error: ${error}`);
    return {
      statusCode: 500,
      body: "Some error occurred..please check the logs",
    };
  }
};
