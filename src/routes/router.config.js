const postRouter = require("./postRouter");
const userRouter = require("./userRouter");

const appRouter = [
  { path: "/api/posts", router: postRouter },
  { path: "/api", router: userRouter },
];

module.exports = appRouter;
