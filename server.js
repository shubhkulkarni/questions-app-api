const express = require("express");
const dotenv = require("dotenv");
const appRouter = require("./src/routes/router.config");
const errorMiddleware = require("./src/middlewares/error");
dotenv.config({ path: "./config.env" });
const app = express();
require("./database");
app.use(express.json());

appRouter.forEach((route) => app.use(route.path, route.router));

app.all("*", (req, res) => {
  res.send("invalid request path " + req.originalUrl);
});

app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("unCaught exception");
  server.close(() => {
    process.exit(1);
  });
});
