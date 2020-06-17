const { RekognitionService, TranslatorService } = require("./services");
const { formatTextResponse, handleGetImage } = require("./helpers");

class Handler {
  constructor({ rekognitionService, translatorService }) {
    this.translatorService = new TranslatorService({
      translator: translatorService,
    });

    this.rekognitionService = new RekognitionService({
      rekognition: rekognitionService,
    });
  }

  async main(event) {
    try {
      const {
        targetLanguage,
        sourceLanguage,
        imageUrl,
      } = event.queryStringParameters;

      const imageBuffer = await handleGetImage(imageUrl);

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
