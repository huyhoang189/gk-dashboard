const { Succeed, Created } = require("../utils/response/success.response");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
// Import the Prisma client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAll = async (req, res, next) => {
  const { keyword } = req.query;
  const { pageSize, pageNumber } = req.pagination;

  // Count all records in the database
  const totalRecords = await prisma.listens.count({
    where: {
      OR: [
        {
          url: {
            contains: keyword,
          },
        },
        {
          users: {
            username: {
              contains: keyword,
            },
          },
        },
        // Add more conditions for other columns as needed
      ],
    },
  });

  const listens = await prisma.listens.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
    orderBy: { time: "desc" },
    where: {
      OR: [
        {
          url: {
            contains: keyword,
          },
        },
        {
          users: {
            username: {
              contains: keyword,
            },
          },
        },
        // Add more conditions for other columns as needed
      ],
    },
    select: {
      id: true,
      url: true,
      user_id: true,
      time: true,
      users: {
        select: {
          username: true, // Include the username field
          name: true,
        },
      },
    },
  });

  return new Succeed({
    message: "Get listens successfully",
    metadata: {
      data: listens,
      totalItem: totalRecords,
      currentPage: pageNumber,
      pageSize: pageSize,
    },
  }).send(res);
};

const create = async (req, res, next) => {
  const { user_id, url } = req.body;
  const listen = await prisma.listens.create({
    data: { user_id, url },
  });

  return new Created({
    message: "Create listens successfully",
    metadata: {
      data: listen,
    },
  }).send(res);
};

const deleteItem = async (req, res, next) => {
  const id = req.params.id;
  await prisma.listens.delete({
    where: { id },
  });
  return new Succeed({
    message: "Delete listens successfully",
    metadata: {
      data: {},
    },
  }).send(res);
};

module.exports = {
  getAll,
  create,
  deleteItem,
};
