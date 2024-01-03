const { Succeed, Created } = require("../utils/response/success.response");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
const fs = require("fs");

const url = process.env.EMAIL_HEADER_CONFIG_FILE;

const getAll = async (req, res, next) => {
  const configs = await readEmailHeaderConf();
  // console.log(configs);
  return new Succeed({
    message: "Get emailHeader successfully",
    metadata: {
      data: {
        message: configs,
      },
    },
  }).send(res);
};

const update = async (req, res, next) => {
  const status = await updateEmailHeaderConf(req.body);
  if (!status) throw new ForbiddenError("Update missing!");

  const configs = await readEmailHeaderConf();

  return new Succeed({
    message: "Update emailHeader successfully",
    metadata: {
      data: configs,
    },
  }).send(res);
};

module.exports = {
  getAll,
  update,
};

const readEmailHeaderConf = async () => {
  try {
    const datas = await fs.readFileSync(url, "utf8");
    const entries = datas.trim();
    return entries;
  } catch (error) {
    console.log(error);
    return {};
  }
};

const updateEmailHeaderConf = async (data) => {
  try {
    // console.log(data.message);
    fs.writeFileSync(url, data.message);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// set\s+\$Roboo_charset\s+"(.*?)";
