const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/projects");
  },
  filename: function (req, file, cb) {
    const uniqueName = uuidv4();
    cb(null, uniqueName + path.extname(file.originalname));
  },
});
module.exports.uploadMultiple = multer({ storage: productStorage }).array(
  "images",
  5
);
