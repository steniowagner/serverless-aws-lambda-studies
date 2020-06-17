class TranslatorService {
  constructor({ translator }) {
    this.translator = translator;
  }

  async handle(text, sourceLanguageCode, targetLanguageCode) {
    console.log(
      `>>> Translating labels from "${sourceLanguageCode}" to "${targetLanguageCode}"...`
    );

    const params = {
      SourceLanguageCode: sourceLanguageCode,
      TargetLanguageCode: targetLanguageCode,
      Text: text,
    };

    const { TranslatedText } = await this.translator
      .translateText(params)
      .promise();

    console.log(">>> Label translation finished!");

    return TranslatedText;
  }
}

module.exports = TranslatorService;
