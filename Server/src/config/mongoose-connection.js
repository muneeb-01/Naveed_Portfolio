const mongoose = require("mongoose");
require("dotenv").config();
const dbgr = require("debug")("development:mongoose");

const uri = process.env.MONGOOSE_URI;
mongoose
  .connect(uri)
  .then(() => {
    dbgr("Mongoose connected from app.js");
  })
  .catch((error) => {
    console.log(error);
    dbgr("Mongoose connection error");
  });

module.exports = mongoose.connection;
