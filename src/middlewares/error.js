const GlobalError = require("../utils/GlobalError");

const errorMiddleware = (err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .send({ status: "error", message: err.message });
  next();
};

module.exports = errorMiddleware;
