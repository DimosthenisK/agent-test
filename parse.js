const xlsx = require("exceljs");
const fs = require("fs");
const excelFilePath = __dirname + "/assets/answers.xlsx";
const jsonFilePath = __dirname + "/assets/answers.json";
const excelReadStream = fs.createReadStream(excelFilePath);
const jsonWriteStream = fs.createWriteStream(jsonFilePath, { flags: "a" });
const workbook = new xlsx.Workbook();

(async () => {
  await workbook.xlsx.read(excelReadStream);
  const getNumberFromChar = (char) => {
    switch (char) {
      case "α":
        return 0;
      case "β":
        return 1;
      case "γ":
        return 2;
      case "δ":
        return 3;
    }
  };
  const simplifyAnswer = (answerText) => {
    if (typeof answerText == "string") return answerText;
    if (typeof answerText == "number") return answerText.toString();
    else {
      let finalText = "";
      for (const textPart of answerText.richText) finalText += textPart.text;
      return finalText;
    }
  };

  const questions = [];
  let lastQNumber = null;
  workbook.worksheets[0].eachRow((row, rowNumber) => {
    if (rowNumber == 1) return;
    let part = (rowNumber - 1) % 5;
    if (part == 1) {
      let rowNumber = row.values[1].result
        ? Number(row.values[1].result)
        : Number(row.values[1]);
      lastQNumber = rowNumber;
      questions[rowNumber] = {
        qNumber: rowNumber,
        label: simplifyAnswer(row.values[4]),
        correctAnswer: getNumberFromChar(row.values[2]),
        possibleAnswers: [],
      };
    } else {
      questions[lastQNumber].possibleAnswers[
        getNumberFromChar(row.values[3])
      ] = simplifyAnswer(row.values[4]);
    }
  });
  jsonWriteStream.write(JSON.stringify(questions, null, 4));
})();
