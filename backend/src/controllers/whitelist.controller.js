const { Succeed, Created } = require("../utils/response/success.response");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
const fs = require("fs");

const filename = process.env.WHITE_LIST_CONFIG_FILE;
const ipRegex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

class WhitelistController {
  // Get all whitelist IPs
  getAll = async (req, res, next) => {
    const whitelists = readWhitelistIps();

    if (!whitelists) throw new NotFoundError("Not found whitelist");

    // Return a success response
    return new Succeed({
      message: "Get whitelist success",
      metadata: {
        data: whitelists,
        total: whitelists?.length,
      },
    }).send(res);
  };

  // Create a new whitelist IP
  create = async (req, res, next) => {
    const { ip } = req.body;
    if (!ip) throw new NotFoundError("IP address is required");

    if (!isValidIP(ip)) throw new ForbiddenError("It isn't IP format");

    const whitelists = readWhitelistIps();

    const index = whitelists.indexOf(ip);
    if (index !== -1) throw new ForbiddenError("IP address is existed");

    // Insert the new IP
    whitelists.push(ip);
    writeWhitelistIps(whitelists);

    // Return a success response
    return new Succeed({
      message: "IP inserted successfully",
      metadata: {
        data: whitelists,
        total: whitelists?.length,
      },
    }).send(res);
  };

  // Delete a whitelist IP
  delete = async (req, res, next) => {
    const { ip } = req.params;

    const whitelists = readWhitelistIps();
    const index = whitelists.indexOf(ip);
    if (index !== -1) {
      whitelists.splice(index, 1);
      writeWhitelistIps(whitelists, filename);
      return new Succeed({
        message: "IP deleted successfully",
        metadata: {
          data: ip,
          total: whitelists?.length,
        },
      }).send(res);
    }

    throw new NotFoundError("IP address not found");
  };
}

module.exports = WhitelistController;

// Function to read the list of whitelisted IPs from a file
const readWhitelistIps = () => {
  try {
    const data = fs.readFileSync(filename, "utf8");
    return data.split("\n").filter((ip) => ip.trim() !== "");
  } catch (err) {
    return [];
  }
};

// Function to write the list of whitelisted IPs to a file
const writeWhitelistIps = (ipList) => {
  fs.writeFileSync(filename, ipList.join("\n") + "\n");
};

// Function to validate if a string represents a valid IP address
const isValidIP = (ip) => {
  return ipRegex.test(ip);
};
