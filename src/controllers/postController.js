const catchAsync = require("../utils/catchAsync");
const GlobalError = require("../utils/GlobalError");
const Question = require("../models/questions.model");

exports.getAllQuestions = catchAsync(async (req, res, next) => {
  const questions = await Question.find({}).select("-__v");

  res.status(200).send(questions || []);
});

exports.postQuestion = catchAsync(async (req, res, next) => {
  const { question, askedBy, category } = req.body;
  if (!question || !askedBy) {
    return next(new GlobalError("Bad request , data is inappropriate", 400));
  }
  await Question.create({ question, askedBy, category });
  res.status(201).send({ message: "Question is posted successfully!" });
});

exports.updateQuestion = catchAsync(async (req, res, next) => {
  const { askedBy, question } = req.body;
  if (!question || !askedBy) {
    return next(new GlobalError("Bad request , data is inappropriate", 400));
  }
  //   if (!req.user.id !== askedBy) {
  //     return next(new GlobalError("You can only update your question", 401));
  //   }
  const newQuestn = await Question.findOne({ _id: req.params.id });
  if (!newQuestn) {
    return next(new GlobalError("Invalid question id", 500));
  }
  newQuestn.question = question;
  await newQuestn.save();
  res
    .status(200)
    .send({ status: "success", message: "question updated successfully" });
});
