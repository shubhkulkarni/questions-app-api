const { connect } = require("mongoose");

const databaseURI = process.env.DATABASE;

connect(databaseURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
}).then((c) => console.log("Database connection successfull !"));
