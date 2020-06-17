const aws = require("aws-sdk");

const Handler = require("./src/Handler");

const handler = new Handler({
  rekognitionService: new aws.Rekognition(),
  translatorService: new aws.Translate(),
});

module.exports.main = handler.main.bind(handler);
