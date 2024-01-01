const { Succeed, Created } = require("../utils/response/success.response");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
const fs = require("fs");
const { getDataWithPaging } = require("../utils/common");

const url = process.env.NGINX_CONFIG_FILE;

const fields = {
  ROBOO_CHALLENGE_MODES: "$Roboo_challenge_modes",
  ROBOO_COOKIE_NAME: "$Roboo_cookie_name",
  ROBOO_CHARSET: "$Roboo_charset",
  HTTP302_URL_VARIABLE_NAME: "$http302_url_variable_name",
  HTTP302_SECRET_KEY: "$http302_secret_key",
  HTTP302_PASS_KEY: "$http302_pass_key",
  HTTP302_TRUNC_VALID_COOKIE_AMOUNT: "$http302_trunc_valid_cookie_amount",
  ROBOO_VALIDITY_WINDOW: "$Roboo_validity_window",
  CAP_SECRET_KEY: "$cap_secret_key",
  CAP_PASS_KEY: "$cap_pass_key",
  CAP_TRUNC_VALID_COOKIE_AMOUNT: "$cap_trunc_valid_cookie_amount",
};

const getAll = async (req, res, next) => {
  const configs = await readNginxConf();
  // console.log(configs);
  return new Succeed({
    message: "Get challenge successfully",
    metadata: {
      data: configs,
    },
  }).send(res);
};

const update = async (req, res, next) => {
  const status = await updateNginxConf(req.body);
  if (!status) throw new ForbiddenError("Update missing!");

  const configs = await readNginxConf();

  return new Succeed({
    message: "Update challenge successfully",
    metadata: {
      data: configs,
    },
  }).send(res);
};

module.exports = {
  getAll,
  update,
};

const readNginxConf = async () => {
  try {
    const configs = await fs.readFileSync(url, "utf8");
    let extractedValues = {};
    // Loop through the fields object and extract the values
    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        // Define a regular expression pattern to match the assignment
        const pattern = new RegExp(
          `set\\s+\\${fields[key]}\\s+["']?(.*?)["']?;`
        );
        // Use the regular expression to extract the value
        const match = configs.match(pattern);
        // console.log(pattern);

        if (match && match[1]) {
          extractedValues[key] = parseInt(match[1]) || match[1];
        } else {
          extractedValues[key] = "";
        }
      }
    }

    return extractedValues;
  } catch (error) {
    console.log(error);
    return {};
  }
};

const updateNginxConf = async (data) => {
  try {
    const configs = await fs.readFileSync(url, "utf8");
    let updateConfigs = configs;
    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        // Define a regular expression pattern to match the assignment
        const pattern = new RegExp(
          `set\\s+\\${fields[key]}\\s+["']?(.*?)["']?;`
        );
        const match = configs.match(pattern);
        if (match && match[1]) {
          let value = parseInt(match[1]) || match[1];

          if (value !== data[key]) {
            updateConfigs = updateConfigs.replace(
              pattern,
              `set ${fields[key]} ${data[key]};`
            );
          }
        }
      }
    }

    await fs.writeFileSync(url, updateConfigs);
    return true;
  } catch (error) {
    return false;
  }
};

// set\s+\$Roboo_charset\s+"(.*?)";
