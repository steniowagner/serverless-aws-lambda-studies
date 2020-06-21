const dynamoDBTriggerHandler = {
  async main(event) {
    console.log(">>> EVENT: ", JSON.stringify(event, null, 2));
    return {
      statusCode: 200,
    };
  },
};

module.exports = dynamoDBTriggerHandler.main.bind(dynamoDBTriggerHandler);
