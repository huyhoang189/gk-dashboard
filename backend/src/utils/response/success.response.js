"use strict";

const reasonPhrases = require("../httpStatusCode/reasonPhrases");
const statusCodes = require("../httpStatusCode/statusCodes");

class SuccessResponse {
  constructor({
    message,
    statusCode = statusCodes.OK,
    resonStatusCode = reasonPhrases.OK,
    metadata = {},
  }) {
    this.message = !message ? resonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
  }
  send(res, header = {}) {
    return res.status(this.status).json(this);
  }
}

class Succeed extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class Created extends SuccessResponse {
  constructor({
    message,
    metadata,
    statusCode = statusCodes.CREATED,
    resonStatusCode = reasonPhrases.CREATED,
  }) {
    super({ message, metadata, statusCode, resonStatusCode });
  }
}
class MovedPermanently extends SuccessResponse {
  constructor({
    message,
    metadata,
    statusCode = statusCodes.MOVED_PERMANENTLY,
    resonStatusCode = reasonPhrases.MOVED_PERMANENTLY,
  }) {
    super({ message, metadata, statusCode, resonStatusCode });
  }
}

class Found extends SuccessResponse {
  constructor({
    message,
    metadata,
    statusCode = statusCodes.MOVED_TEMPORARILY,
    resonStatusCode = reasonPhrases.MOVED_TEMPORARILY,
  }) {
    super({ message, metadata, statusCode, resonStatusCode });
  }
}

module.exports = {
  Found,
  Created,
  MovedPermanently,
  Succeed,
};
