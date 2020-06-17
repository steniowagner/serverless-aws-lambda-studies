const { get } = require("axios");

class ImageHandlerService {
  async handle(imageUrl) {
    console.log(">>> Downloading Image...");

    const response = await get(imageUrl, {
      responseType: "arraybuffer",
    });

    const buffer = Buffer.from(response.data, "base64");

    console.log(">>> Image Downloaded!");

    return buffer;
  }
}

module.exports = ImageHandlerService;
