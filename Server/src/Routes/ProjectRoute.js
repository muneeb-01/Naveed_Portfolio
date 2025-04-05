const express = require("express");
const ProjectRoute = express.Router();
const multer = require("multer");
const {
  AddProjectInfo,
  GetProjectInfo,
  AddProjectImages,
  GetProjectInfoById
  ,GetlatestProjects
} = require("../Controller/ProjectController");
const { upload } = require("../config/multer-connection");
const { verifytoken } = require("../middlewares/auth-middleware");

ProjectRoute.post(
  "/AddProjectImages",
  verifytoken,
  (req, res, next) => {
    // Handle Multer errors
    upload.array('images', 5)(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).send(err.message); // Changed to 500 for server error
      } else if (err) {
        return res.status(500).send("Unable to upload files."); // Changed to 500 for server error
      }
      next(); // Proceed to next middleware (AddProjectImages controller)
    });
  },
  AddProjectImages
);

ProjectRoute.post("/AddProjectInfo", verifytoken, AddProjectInfo);
ProjectRoute.get("/GetProjectInfo", GetProjectInfo);
ProjectRoute.get("/GetProjectById/:id", GetProjectInfoById);
ProjectRoute.get("/GetLatestProjects", GetlatestProjects)

module.exports = ProjectRoute;
