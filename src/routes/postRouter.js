const express = require("express");
const {
  getAllQuestions,
  postQuestion,
  updateQuestion,
} = require("../controllers/postController");

const postRouter = express.Router();

postRouter.route("/").get(getAllQuestions).post(postQuestion);

postRouter.route("/:id").patch(updateQuestion);
module.exports = postRouter;
