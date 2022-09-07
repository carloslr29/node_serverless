const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = {
    obtener, insertar
}

async function obtener(tableName, id){
    const result = await dynamodb
      .get({
        TableName: tableName,
        Key: { id },
      })
      .promise();

    return result
}

async function insertar(body, tableName){
    await dynamodb
    .put({
        TableName: tableName,
        Item: body,
    })
    .promise();
}