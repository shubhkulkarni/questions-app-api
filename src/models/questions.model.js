const { Schema, model } = require("mongoose");

const getAvg = (list) => {
  if (!list.length) {
    return 0;
  }
  return list.reduce((prev, curr) => prev + curr) / list.length;
};

const questionSchema = new Schema(
  {
    question: {
      type: String,
      minLength: 10,
      required: [true, "question is required"],
    },
    ratingsList: {
      type: [Number],
      min: 0,
      max: 5,
      default: 0,
      select: false,
    },
    askedBy: {
      //   type: Schema.ObjectId,
      //   ref: "User",
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["technology", "art", "social", "other"],
      default: "other",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

questionSchema.virtual("rating").get(function () {
  return Math.ceil(getAvg(this.ratingsList || []));
});

questionSchema.virtual("ratingsCount").get(function () {
  return this.ratingsList?.length || 0;
});

questionSchema.pre("save", async function (next) {
  if (!this.isModified("question")) return next();
  let ques = this.question.trim();
  let q = ques[ques.length - 1];
  if (q === "?") {
    return next();
  }
  this.question = this.question + " ?";
  next();
});
module.exports = model("Question", questionSchema);
