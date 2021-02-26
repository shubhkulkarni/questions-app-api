class GlobalError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.status = "error";
    this.statusCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = GlobalError;
