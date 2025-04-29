const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      minlength: 10,
    },
    type: {
      type: String,
      default: "Residential",
    },
    workType: {
      type: String,
      default: "New Build",
    },
    client: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    images: {
      type: [String], // array of image URLs
      default: [],
      validate: {
        validator: function (arr) {
          return arr.every((url) => typeof url === "string");
        },
        message: "Images must be an array of URLs (strings).",
      },
    },
    category: {
      type: String,
      trim: true,
    },
    selectedImages: {
      type: [String],
      default: [],
    },
    mainImage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true } // auto add createdAt and updatedAt
);

module.exports = mongoose.model("Project", ProjectSchema);
