const { StatusCodes, ReasonPhrases } = require("../../utils/httpStatusCode");
const { ForbiddenError } = require("../../utils/response/error.response");

const pagination = (req, res, next) => {
  const { pageSize, pageNumber } = req.query;

  let _pageSize = Object.assign({}, pageSize);
  let _pageNumber = Object.assign({}, pageNumber);
  // Check if pageSize is provided and is a positive integer
  if (!_pageSize || isNaN(_pageSize) || _pageSize <= 0) {
    _pageSize = 10;
  }

  // Check if pageNumber is provided and is a positive integer
  if (!_pageNumber || isNaN(_pageNumber) || _pageNumber <= 0) {
    _pageNumber = 1;
  }

  // Attach the validated pagination parameters to the request object
  req.pagination = {
    pageSize: parseInt(_pageSize),
    pageNumber: parseInt(_pageNumber),
  };

  // Continue to the next middleware or route handler
  next();
};

module.exports = pagination;
