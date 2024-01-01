const { Succeed, Created } = require("../utils/response/success.response");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
const fs = require("fs");
const { getDataWithPaging } = require("../utils/common");

const url = process.env.ERROR_CONFIG_FILE;

const getAll = async (req, res, next) => {
  const { keyword, properties } = req.query;
  const { pageSize, pageNumber } = req.pagination;

  const errors = await getDataWithPaging(
    url,
    pageNumber,
    pageSize,
    keyword,
    properties && JSON.parse(properties),
    "ERROR"
  );

  return new Succeed({
    message: "Get error log successfully",
    metadata: {
      data: errors?.entries,
      totalItem: errors?.totalItem,
      currentPage: errors?.currentPage,
      totalPage: errors?.totalPages,
      pageSize: pageSize,
    },
  }).send(res);
};

module.exports = {
  getAll,
};
