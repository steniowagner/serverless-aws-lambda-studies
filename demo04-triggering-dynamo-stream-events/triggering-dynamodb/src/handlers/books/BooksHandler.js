const { validateBookSchema, httpResponse, makeBook } = require("./helpers");
const { DynamoDBService } = require("../../services");

class BooksHandler {
  constructor({ dynamoDBService, table }) {
    this.dynamoDBService = new DynamoDBService({
      dynamoDB: dynamoDBService,
      table,
    });
  }

  static validateSchema() {
    return validateBookSchema();
  }

  async main({ body }) {
    try {
      const book = makeBook(body);

      await this.dynamoDBService.create(book);

      return httpResponse.createdResponse(book);
    } catch (err) {
      return httpResponse.errorResponse({ statusCode: 500 });
    }
  }
}

module.exports = BooksHandler;
