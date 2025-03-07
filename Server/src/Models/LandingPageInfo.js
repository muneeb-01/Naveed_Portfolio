const mongoose = require("mongoose");

const LandingInfoSchema = mongoose.Schema({
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  paragraph_1: {
    type: String,
    default: "Add Something From Admin Panel",
  },
  paragraph_2: {
    type: String,
    default: "Add Something From Admin Panel",
  },
});

module.exports = mongoose.model("LandingPageInfo", LandingInfoSchema);
