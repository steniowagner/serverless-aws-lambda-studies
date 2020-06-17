const {
  ImageHandlerService,
  RekognitionService,
  TranslatorService,
} = require("./services");

const { formatTextResponse } = require("./helpers");

class Handler {
  constructor({ rekognitionService, translatorService }) {
    this.translatorService = new TranslatorService({
      translator: translatorService,
    });

    this.rekognitionService = new RekognitionService({
      rekognition: rekognitionService,
    });

    this.imageHandlerService = new ImageHandlerService();
  }

  async main(event) {
    try {
      const {
        targetLanguage,
        sourceLanguage,
        imageUrl,
      } = event.queryStringParameters;

      const imageBuffer = await this.imageHandlerService.handle(imageUrl);

      const { labels, rekognizedItems } = await this.rekognitionService.handle(
        imageBuffer
      );

      const translatedLabels = await this.translatorService.handle(
        labels.join(","),
        sourceLanguage,
        targetLanguage
      );

      const textResponse = formatTextResponse({
        translatedLabels: translatedLabels.split(","),
        rekognizedItems,
        targetLanguage,
        sourceLanguage,
      });

      return {
        statusCode: 200,
        body: textResponse,
      };
    } catch (err) {
      console.log("Error >>> ", err.stack);
      return {
        statusCode: 500,
        body: "Internal server error",
      };
    }
  }
}

module.exports = Handler;
