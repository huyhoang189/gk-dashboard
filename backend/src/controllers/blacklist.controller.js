const { Succeed, Created } = require("../utils/response/success.response");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
const fs = require("fs");

const filename = process.env.BLACK_LIST_CONFIG_FILE;
const ipRegex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

class BlacklistController {
  // Get all blacklist IPs
  getAll = async (req, res, next) => {
    const blacklists = readBlacklistIps();

    if (!blacklists) throw new NotFoundError("Not found blacklist");

    // Return a success response
    return new Succeed({
      message: "Get blacklist success",
      metadata: {
        data: blacklists,
        total: blacklists?.length,
      },
    }).send(res);
  };

  // Create a new blacklist IP
  create = async (req, res, next) => {
    const { ip } = req.body;
    if (!ip) throw new NotFoundError("IP address is required");

    if (!isValidIP(ip)) throw new ForbiddenError("It isn't IP format");

    const blacklists = readBlacklistIps();

    const index = blacklists.indexOf(ip);
    if (index !== -1) throw new ForbiddenError("IP address is existed");

    // Insert the new IP
    blacklists.push(ip);
    writeBlacklistIps(blacklists);

    // Return a success response
    return new Succeed({
      message: "IP inserted successfully",
      metadata: {
        data: blacklists,
        total: blacklists?.length,
      },
    }).send(res);
  };

  // Delete a blacklist IP
  delete = async (req, res, next) => {
    const { ip } = req.params;

    const blacklists = readBlacklistIps();
    const index = blacklists.indexOf(ip);
    if (index !== -1) {
      blacklists.splice(index, 1);
      writeBlacklistIps(blacklists, filename);
      return new Succeed({
        message: "IP deleted successfully",
        metadata: {
          data: ip,
          total: blacklists?.length,
        },
      }).send(res);
    }

    throw new NotFoundError("IP address not found");
  };
}

module.exports = BlacklistController;

// Function to read the list of blacklisted IPs from a file
const readBlacklistIps = () => {
  try {
    const data = fs.readFileSync(filename, "utf8");
    return data.split("\n").filter((ip) => ip.trim() !== "");
  } catch (err) {
    return [];
  }
};

// Function to write the list of blacklisted IPs to a file
const writeBlacklistIps = (ipList) => {
  fs.writeFileSync(filename, ipList.join("\n") + "\n");
};

// Function to validate if a string represents a valid IP address
const isValidIP = (ip) => {
  return ipRegex.test(ip);
};
