const { Succeed, Created } = require("../utils/response/success.response");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
const fs = require("fs");

const url = process.env.DATABASE_CONFIG_FILE;

// const fields = {
//   TCP_FLOOD: "tcp_flood",
//   UDP_FLOOD: "udp_flood",
//   ICMP_FLOOD: "icmp_flood",
//   SYN_FLOOD: "syn_flood",
//   TCP_AMPLIFICATION: "tcp_amplification",
//   UDP_AMPLIFICATION: "udp_amplification",
//   REQUEST_RATE: "request_rate",
//   CPU_USAGE: "cpu_usage",
//   MEMORY_USAGE: "memory_usage",
//   NETWORK_IN: "network_in",
// };

const getAll = async (req, res, next) => {
  const configs = await readDatabaseConf();
  // console.log(configs);
  return new Succeed({
    message: "Get database successfully",
    metadata: {
      data: configs,
    },
  }).send(res);
};

const update = async (req, res, next) => {
  const status = await updateDatabaseConf(req.body);
  if (!status) throw new ForbiddenError("Update missing!");

  const configs = await readDatabaseConf();

  return new Succeed({
    message: "Update database successfully",
    metadata: {
      data: configs,
    },
  }).send(res);
};

module.exports = {
  getAll,
  update,
};

const readDatabaseConf = async () => {
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

const updateDatabaseConf = async (data) => {
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

    console.log(formattedData);

    await fs.writeFileSync(url, formattedData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// set\s+\$Roboo_charset\s+"(.*?)";
