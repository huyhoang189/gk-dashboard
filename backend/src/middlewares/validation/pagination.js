const { StatusCodes, ReasonPhrases } = require("../../utils/httpStatusCode");
const { ForbiddenError } = require("../../utils/response/error.response");

const pagination = (req, res, next) => {
  const { page, limit } = req.query;

  // Validate page parameter
  const pageNumber = parseInt(page, 10) || 1;

  if (pageNumber < 1) {
    throw new ForbiddenError(
      "Invalid page number. Page number must be greater than or equal to 1."
    );
  }

  // Validate limit parameter
  const limitNumber = parseInt(limit, 10) || 10;
  // console.log(limit);
  // if (limitNumber > 1 || limitNumber <= 1000) {
  //   throw new ForbiddenError(
  //     "Invalid limit value. Limit must be between 1 and 100."
  //   );
  // }

  req.pagination = {
    limit: parseInt(limit || 10),
    offset: parseInt(page - 1) * limit || 0,
  };
  next();
};

module.exports = pagination;
