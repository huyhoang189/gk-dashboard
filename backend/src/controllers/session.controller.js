const { Succeed, Created } = require("../utils/response/success.response");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
const fs = require("fs");

const url = process.env.SESSION_CONFIG_FILE;

const getAll = async (req, res, next) => {
  const configs = await readSessionConf();
  // console.log(configs);
  return new Succeed({
    message: "Get session successfully",
    metadata: {
      data: configs,
    },
  }).send(res);
};

const update = async (req, res, next) => {
  const status = await updateSessionConf(req.body);
  if (!status) throw new ForbiddenError("Update missing!");

  const configs = await readSessionConf();

  return new Succeed({
    message: "Update session successfully",
    metadata: {
      data: configs,
    },
  }).send(res);
};

module.exports = {
  getAll,
  update,
};

const readSessionConf = async () => {
  try {
    const datas = await fs.readFileSync(url, "utf8");
    const entries = datas.split("\n");

    let extractedValues = {};
    for (let entry of entries) {
      const pattern = /^(\w+)\s+(\d+)\s*$/;
      const match = entry.match(pattern);
      if (match) {
        const keyword = match[1];
        const value = parseInt(match[2]);
        extractedValues[keyword.toUpperCase()] = value;
      } else {
        // extractedValues[match[1].toUpperCase()] = "";
      }
    }

    return extractedValues;
  } catch (error) {
    console.log(error);
    return {};
  }
};

const updateSessionConf = async (data) => {
  try {
    const convertedObject = {};

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const lowercaseKey = key.toLowerCase();
        convertedObject[lowercaseKey] = data[key];
      }
    }

    const formattedData = Object.keys(convertedObject)
      .map((key) => `${key} ${convertedObject[key]}`)
      .join("\n");

    // console.log(formattedData);

    fs.writeFileSync(url, formattedData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// set\s+\$Roboo_charset\s+"(.*?)";
