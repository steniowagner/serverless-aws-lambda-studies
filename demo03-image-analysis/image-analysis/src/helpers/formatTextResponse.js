const formatTextResponse = ({
  translatedLabels,
  rekognizedItems,
  targetLanguage,
  sourceLanguage,
}) => {
  console.log(">>> Formating response text...");

  const textResponse = rekognizedItems.reduce((acc, curr, index) => {
    const item = `[${curr.Name}, ${
      translatedLabels[index]
    }] - ${curr.Confidence.toFixed(2)}%`;

    return [...acc, item];
  }, []);

  const translationInfo = `[Translation Info]\nsource-language: ${sourceLanguage} # target-language: ${targetLanguage}\n\n`;

  console.log(">>> Text formated and ready to be returned!");

  return translationInfo.concat(textResponse.join("\n"));
};

module.exports = formatTextResponse;
