const jwt = require("jsonwebtoken");

exports.getAccessToken = async (payload) => {
  return await jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
    expiresIn: "1h",
  });
};
