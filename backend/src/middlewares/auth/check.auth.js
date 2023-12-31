const { HEADER } = require("../../commom");
const { validateAccessToken } = require("../../services/token-service");
const { ReasonPhrases, StatusCodes } = require("../../utils/httpStatusCode");

const checkAuth = async (req, res, next) => {
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  const userId = req.headers[HEADER.CLIENT_ID];

  const user = await validateAccessToken({ accessToken, userId });
  if (user) {
    req.userId = user;
    next();
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: ReasonPhrases.UNAUTHORIZED,
      code: StatusCodes.UNAUTHORIZED,
    });
  }
};

module.exports = checkAuth;
