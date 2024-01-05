const fs = require("fs");
const readline = require("readline");

const readReverseFile = (filePath) => {
  return new Promise((resolve, reject) => {
    let stream = fs.createReadStream(filePath);
    stream.on("error", reject);

    let rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    let lines = [];

    rl.on("line", (line) => {
      lines.unshift(line); // Add each line to the start of the array
    });

    rl.on("close", () => {
      resolve(lines); // Resolve with the reversed lines
    });
  });
};

const readFileSync = async (filePath) => {
  try {
    const lines = await readReverseFile(filePath);
    // console.log(lines);
    return lines;
  } catch (error) {
    return [];
  }

  // readReverseFile(filePath)
  //   .then((lines) => {
  //     return lines;
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //     return [];
  //   });
};

module.exports = {
  readFileSync,
};
