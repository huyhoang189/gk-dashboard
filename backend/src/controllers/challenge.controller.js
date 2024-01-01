const { Succeed, Created } = require("../utils/response/success.response");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
const fs = require("fs");
const { getDataWithPaging } = require("../utils/common");

const url = process.env.CHALLENGE_CONFIG_FILE;

const getAll = async (req, res, next) => {
  const { keyword, properties } = req.query;
  const { pageSize, pageNumber } = req.pagination;

  const challenges = await getDataWithPaging(
    url,
    pageNumber,
    pageSize,
    keyword,
    properties && JSON.parse(properties)
  );

  return new Succeed({
    message: "Get challenge log successfully",
    metadata: {
      data: challenges?.entries,
      totalItem: challenges?.totalItem,
      currentPage: challenges?.currentPage,
      totalPage: challenges?.totalPages,
      pageSize: pageSize,
    },
  }).send(res);
};

module.exports = {
  getAll,
};
