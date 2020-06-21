class DynamoDBService {
  constructor({ dynamoDB, table }) {
    this.instance = dynamoDB;
    this.table = table;
  }

  makePutParams(item) {
    return {
      TableName: this.table,
      Item: item,
    };
  }

  async create(data) {
    const params = this.makePutParams(data);

    return this.instance.put(params).promise();
  }
}

module.exports = DynamoDBService;
