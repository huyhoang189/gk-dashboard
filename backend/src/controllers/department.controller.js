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

  const departments = await prisma.departments.findMany({
    include: { departments: true },
  });

  return new Succeed({
    message: "Get departments successfully",
    metadata: {
      data: departments,
    },
  }).send(res);
};

const create = async (req, res, next) => {
  const { name, identification, description, parent_id } = req.body;
  const department = await prisma.departments.create({
    data: { name, identification, description, parent_id },
  });
  return new Created({
    message: "Create departments successfully",
    metadata: {
      data: department,
    },
  }).send(res);
};

const update = async (req, res, next) => {
  const { id, name, identification, description, parent_id } = req.body;
  const department = await prisma.departments.update({
    where: { id: id },
    data: {
      name,
      identification,
      description,
      parent_id,
    },
  });

  return new Succeed({
    message: "Update departments successfully",
    metadata: {
      data: department,
    },
  }).send(res);
};

const deleteItem = async (req, res, next) => {
  const id = parseInt(req.params.id);
  await prisma.departments.delete({
    where: { id },
  });
  return new Succeed({
    message: "Delete departments successfully",
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
