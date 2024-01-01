const { Succeed, Created } = require("../utils/response/success.response");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
const fs = require("fs");
const { getDataWithPaging } = require("../utils/common");

const url = process.env.SUCCESS_CONFIG_FILE;

const getAll = async (req, res, next) => {
  const { keyword, properties } = req.query;
  const { pageSize, pageNumber } = req.pagination;

  const successs = await getDataWithPaging(
    url,
    pageNumber,
    pageSize,
    keyword,
    properties && JSON.parse(properties)
  );

  return new Succeed({
    message: "Get success log successfully",
    metadata: {
      data: successs?.entries,
      totalItem: successs?.totalItem,
      currentPage: successs?.currentPage,
      totalPage: successs?.totalPages,
      pageSize: pageSize,
    },
  }).send(res);
};

module.exports = {
  getAll,
};
