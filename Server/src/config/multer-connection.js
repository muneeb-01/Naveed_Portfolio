const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["*", "webp", "jpg", "jpeg", "png", "gif"],
  },
});
const upload = multer({ storage: storage });

module.exports.upload = upload;
