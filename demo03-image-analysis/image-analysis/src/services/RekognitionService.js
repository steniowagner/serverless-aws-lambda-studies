const MIN_CONFIDENCE = 80;

class RekognitionService {
  constructor({ rekognition }) {
    this.rekognitionService = rekognition;
  }

  async handle(imageBuffer) {
    console.log(">>> Analysing Image...");

    const results = await this.rekognitionService
      .detectLabels({
        Image: {
          Bytes: imageBuffer,
        },
      })
      .promise();

    const rekognizedItems = results.Labels.filter(
      (result) => result.Confidence > MIN_CONFIDENCE
    );

    const labels = rekognizedItems.map((result) => result.Name);

    console.log(">>> Image analysis finished! All labels are set!");

    return { rekognizedItems, labels };
  }
}

module.exports = RekognitionService;
