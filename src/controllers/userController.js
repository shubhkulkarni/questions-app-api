const User = require("../models/user.model");
const { getAccessToken } = require("../utils/jwt");
const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const { email, password, confirmPassword, name } = req.body;
  const user = await User.create({ name, email, password, confirmPassword });
  const token = await getAccessToken({ id: user._id });
  res.status(201).send({
    status: "success",
    accessToken: token,
    data: { id: user._id, name: user.name, email: user.email },
  });
});
