const AWS = require("aws-sdk");

const { validator, constants } = require("../../utils");
const BooksHandler = require("./BooksHandler");

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const handler = new BooksHandler({
  table: process.env.DYNAMODB_TABLE,
  dynamoDBService: dynamoDB,
});

module.exports = validator(
  handler.main.bind(handler),
  BooksHandler.validateSchema(),
  constants.ARG_TYPE.BODY
);
