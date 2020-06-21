module.exports = {
  booksDynamoDBTrigger: require("./src/handlers/dynamodb-trigger"),
  booksInsert: require("./src/handlers/books"),
};
