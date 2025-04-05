const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // Import cloudinary configuration

// Configure Multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',  // Specify folder in Cloudinary
    allowed_formats: ['*','webp','jpg','jpeg','png','gif'], // Specify allowed formats
  },
});

// Create and export Multer upload instance
module.exports.upload = multer({ storage: storage });
