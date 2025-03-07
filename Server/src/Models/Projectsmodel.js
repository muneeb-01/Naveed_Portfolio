const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  Type: {
    type: String,
    default: "Residential",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagesUrl: {
    type: Array,
    default: [],
    required: true,
  },
  title: {
    type: String,
    unique: true,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
