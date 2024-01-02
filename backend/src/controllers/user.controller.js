const { Succeed, Created } = require("../utils/response/success.response");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
// Import the Prisma client
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const getAll = async (req, res, next) => {
  const { keyword, properties } = req.query;
  const { pageSize, pageNumber } = req.pagination;

  const users = await prisma.users.findMany({
    select: {
      user_id: true,
      username: true,
      role_id: true,
      roles: true,
    },
  });

  return new Succeed({
    message: "Get users successfully",
    metadata: {
      data: users,
    },
  }).send(res);
};

const create = async (req, res, next) => {
  const { username, password, role_id } = req.body;

  // Generate a salt and hash the password
  const saltRounds = 10; // Number of salt rounds (adjust as needed)
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  const user = await prisma.users.create({
    data: { username, password: hashedPassword, role_id },
  });
  return new Created({
    message: "Create users successfully",
    metadata: {
      data: user,
    },
  }).send(res);
};

const update = async (req, res, next) => {
  const { username, password, role_id, user_id } = req.body;
  const user = await prisma.users.update({
    where: { user_id },
    data: {
      username,
      password,
      role_id,
    },
  });

  return new Succeed({
    message: "Update users successfully",
    metadata: {
      data: user,
    },
  }).send(res);
};

const deleteItem = async (req, res, next) => {
  const user_id = parseInt(req.params.id);
  await prisma.users.delete({
    where: { user_id },
  });
  return new Succeed({
    message: "Delete users successfully",
    metadata: {
      data: {},
    },
  }).send(res);
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await prisma.users.findUnique({
    where: { username: username },
    include: { roles: true },
  });
  if (!user) throw new NotFoundError("Not found user");

  // Compare the provided password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new NotFoundError("Invalid password");
  }

  return new Succeed({
    message: "Login successfully",
    metadata: {
      data: user,
    },
  }).send(res);
};

module.exports = {
  getAll,
  create,
  update,
  deleteItem,
  login,
};
