const { Succeed, Created } = require("../utils/response/success.response");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
// Import the Prisma client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAll = async (req, res, next) => {
  const { keyword, properties } = req.query;
  const { pageSize, pageNumber } = req.pagination;

  const roles = await prisma.roles.findMany();

  return new Succeed({
    message: "Get roles successfully",
    metadata: {
      data: roles,
    },
  }).send(res);
};

const create = async (req, res, next) => {
  const { name, permission } = req.body;
  const role = await prisma.roles.create({
    data: { name, permission },
  });
  return new Created({
    message: "Create roles successfully",
    metadata: {
      data: role,
    },
  }).send(res);
};

const update = async (req, res, next) => {
  const { role_id, name, permission } = req.body;
  const role = await prisma.roles.update({
    where: { role_id: role_id },
    data: {
      name,
      permission,
    },
  });

  return new Succeed({
    message: "Update roles successfully",
    metadata: {
      data: role,
    },
  }).send(res);
};

const deleteItem = async (req, res, next) => {
  const role_id = parseInt(req.params.id);
  await prisma.roles.delete({
    where: { role_id },
  });
  return new Succeed({
    message: "Delete roles successfully",
    metadata: {
      data: {},
    },
  }).send(res);
};

module.exports = {
  getAll,
  create,
  update,
  deleteItem,
};
