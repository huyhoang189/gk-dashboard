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
  const { name, permissions } = req.body;
  const role = await prisma.roles.create({
    data: { name, permissions },
  });
  return new Created({
    message: "Create roles successfully",
    metadata: {
      data: role,
    },
  }).send(res);
};

const update = async (req, res, next) => {
  const { id, name, permissions } = req.body;
  const role = await prisma.roles.update({
    where: { id: id },
    data: {
      name,
      permissions,
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
  const id = parseInt(req.params.id);
  await prisma.roles.delete({
    where: { id },
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
