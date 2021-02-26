const { model, Schema } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new Schema({
  name: { type: String, required: [true, "name is required"], minLength: 2 },
  email: {
    type: String,
    required: [true, "email id is required"],
    unique: [true, "email id already exists"],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "email id is invalid"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    trim: true,
    minLength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "confirmPassword is required"],
    trim: true,
    minLength: 8,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "passwords don't match",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin", "seller"],
    default: "user",
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) next();
  this.password = bcrypt.hash(this.password, 8);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.matchPasswords = async function (reqPW, dbPW) {
  return await bcrypt.compare(reqPW, dbPW);
};
module.exports = model("User", userSchema);
