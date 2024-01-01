const { Succeed, Created } = require("../utils/response/success.response");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
const fs = require("fs");

const filename = process.env.EMAIL_CONFIG_FILE; // Update the file name accordingly

// Get all email addresses
const getAll = async (req, res, next) => {
  const emails = readEmailList();

  if (!emails) throw new NotFoundError("Not found email list");

  // Return a success response
  return new Succeed({
    message: "Get email list success",
    metadata: {
      data: emails,
      total: emails?.length,
    },
  }).send(res);
};

// Create a new email address
const create = async (req, res, next) => {
  const { email } = req.body;
  if (!email) throw new NotFoundError("Email address is required");

  const emails = readEmailList();

  if (emails.includes(email))
    throw new ForbiddenError("Email address is already in the list");

  // Insert the new email
  emails.push(email);
  writeEmailList(emails);

  // Return a success response
  return new Succeed({
    message: "Email inserted successfully",
    metadata: {
      data: emails,
      total: emails?.length,
    },
  }).send(res);
};

// Delete an email address
const deleteItem = async (req, res, next) => {
  const { email } = req.params;

  const emails = readEmailList();
  const index = emails.indexOf(email);
  if (index !== -1) {
    emails.splice(index, 1);
    writeEmailList(emails);
    return new Succeed({
      message: "Email deleted successfully",
      metadata: {
        data: email,
        total: emails?.length,
      },
    }).send(res);
  }

  throw new NotFoundError("Email address not found");
};

module.exports = { getAll, create, deleteItem };

// Function to read the list of email addresses from a file
const readEmailList = () => {
  try {
    const data = fs.readFileSync(filename, "utf8");
    return data.split("\n").filter((email) => email.trim() !== "");
  } catch (err) {
    return [];
  }
};

// Function to write the list of email addresses to a file
const writeEmailList = (emailList) => {
  fs.writeFileSync(filename, emailList.join("\n") + "\n");
};
