const { Succeed, Created } = require("../utils/response/success.response");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
const fs = require("fs");

const url = process.env.BACKUP_CONFIG_FILE;

const getAll = async (req, res, next) => {
  const configs = readDataFromFile();
  if (!configs) throw new ForbiddenError("Not found configs");

  return new Succeed({
    message: "Get backup successfully",
    metadata: {
      data: configs,
    },
  }).send(res);
};
const update = async (req, res, next) => {
  const { status, time } = req.body;
  const isExcuted = updateObject(status, time);
  if (!isExcuted) throw new ForbiddenError("Update missing!");

  const configs = await readDataFromFile();

  return new Succeed({
    message: "Update backup successfully",
    metadata: {
      data: configs,
    },
  }).send(res);
};

module.exports = {
  getAll,
  update,
};

//function

const readDataFromFile = () => {
  try {
    const fileContents = fs.readFileSync(url, "utf-8");
    const lines = fileContents.trim().split("\n");
    const data = lines.map((line) => {
      const [status, time] = line.split(" ");
      return {
        status: parseInt(status, 10),
        time: parseInt(time, 10),
      };
    });
    return data;
  } catch (error) {
    console.error("Error reading the file:", error);
    return [];
  }
};

// Function to update the status and time of an object in the array
const updateObject = (newStatus, newTime) => {
  const data = readDataFromFile();
  if (data.length > 0) {
    data[0].status = newStatus;
    data[0].time = newTime;
    saveDataToFile(data);
    return true; // Updated successfully
  }
  return false; // Index is out of bounds
};

// Function to save the updated data back to the file
const saveDataToFile = (data) => {
  const lines = data.map((obj) => `${obj.status} ${obj.time}`);
  const fileContents = lines.join("\n");
  fs.writeFileSync(url, fileContents);
};
