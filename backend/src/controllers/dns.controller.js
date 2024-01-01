const { Succeed, Created } = require("../utils/response/success.response");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
const fs = require("fs");
const { isValidIP } = require("../utils/common");

const filename = process.env.DNS_CONFIG_FILE;

const getAll = async (req, res, next) => {
  const dnss = getAllEntries();
  if (!dnss) throw new NotFoundError("Not found dns");
  return new Succeed({
    message: "Get list dns successfully",
    metadata: {
      data: dnss,
    },
  }).send(res);
};

const create = async (req, res, next) => {
  const { ip, status } = req.body;
  if (!ip) throw new NotFoundError("IP address is required");
  if (!isValidIP(ip)) throw new ForbiddenError("It isn't IP format");

  const isExcuted = createEntry(ip, status);
  if (!isExcuted) throw new ForbiddenError("Insert is misssing!");
  return new Succeed({
    message: "Create dns successfully",
    metadata: {
      data: { ip, status },
    },
  }).send(res);
};

const update = async (req, res, next) => {
  const { ip, status } = req.body;
  if (!ip) throw new NotFoundError("IP address is required");
  if (!isValidIP(ip)) throw new ForbiddenError("It isn't IP format");

  const isExcuted = updateEntry(ip, status);
  if (!isExcuted) throw new ForbiddenError("Update is misssing!");

  return new Succeed({
    message: "Create dns successfully",
    metadata: {
      data: { ip, status },
    },
  }).send(res);
};

const deleteItem = async (req, res, next) => {
  const { ip } = req.params;
  const isExcuted = deleteEntry(ip);
  if (!isExcuted) throw new ForbiddenError("Delete is misssing!");

  return new Succeed({
    message: "Delete dns successfully",
    metadata: {
      data: { ip },
    },
  }).send(res);
};

///service

// Function to get all entries from the file
const getAllEntries = () => {
  try {
    const data = fs.readFileSync(filename, "utf8");
    const entries = data.split("\n").map((line) => {
      const [ip, status] = line.split(" ");
      return { ip, status: parseInt(status) };
    });
    return entries;
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
};

// Function to create a new entry
const createEntry = (ip, status) => {
  try {
    const entries = getAllEntries();
    entries.push({ ip, status });
    const formattedData = entries
      .map(({ ip, status }) => `${ip} ${status}`)
      .join("\n");
    fs.writeFileSync(filename, formattedData, "utf8");
    return true;
  } catch (error) {
    console.error("Error creating entry:", error);
    return false;
  }
};

// Function to update an entry by IP address
const updateEntry = (ip, newStatus) => {
  try {
    const entries = getAllEntries();
    const updatedEntries = entries.map((entry) => {
      if (entry.ip === ip) {
        return { ...entry, status: newStatus };
      }
      return entry;
    });
    const formattedData = updatedEntries
      .map(({ ip, status }) => `${ip} ${status}`)
      .join("\n");
    fs.writeFileSync(filename, formattedData, "utf8");
    return true;
  } catch (error) {
    console.error("Error updating entry:", error);
    return false;
  }
};

// Function to delete an entry by IP address
const deleteEntry = (ip) => {
  try {
    const entries = getAllEntries();
    const updatedEntries = entries.filter((entry) => entry.ip !== ip);
    const formattedData = updatedEntries
      .map(({ ip, status }) => `${ip} ${status}`)
      .join("\n");
    fs.writeFileSync(filename, formattedData, "utf8");
    return true;
  } catch (error) {
    console.error("Error deleting entry:", error);
    return false;
  }
};

module.exports = {
  getAll,
  create,
  update,
  deleteItem,
};
