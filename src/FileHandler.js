const lineReader = require("line-reader");
const fs = require("fs");
// reading with file position boundaries
const getValue = (filename, lineIndex) => {
  let lineNo = 0;

  return new Promise((resolve, reject) => {
    lineReader.eachLine("./temp/runs/" + filename, function (line, last, cb) {
      if (lineNo == lineIndex) {
        resolve({ value: parseInt(line), last });
        cb(false);
        return;
      }

      lineNo++;
      if (last || lineNo > lineIndex) {
        resolve({ value: null, last });
        cb(false);
      } else {
        cb();
      }
    });
  });
};

const getFilesNames = () => {
  return new Promise((resolve, reject) => {
    fs.readdir("./temp/runs/", (err, files) => {
      resolve(files);
    });
  });
};

const writeFirstOutputValue = (value) => {
  fs.writeFileSync("./temp/output.txt",value,{encoding:'utf8',flag:'w'})
}

const addOutputValue = (value) => {

  fs.appendFile("./temp/output.txt", value + "\n", "utf8", (err) => {
    if (err) {
      return console.log(err);
    }
    // console.log(value, "output value");
  });
};

const addInputValue = (value , filename) => {

  fs.appendFile("./temp/runs/"+filename, value + "\n", "utf8", (err) => {
    if (err) {
      return console.log(err);
    }
    // console.log(value, "saved");
  });
};

module.exports = {
  getValue,
  getFilesNames,
  addOutputValue,
  writeFirstOutputValue,
  addInputValue
};
