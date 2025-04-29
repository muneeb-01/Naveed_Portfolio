const express = require("express");
const ProjectRoute = express.Router();
const { upload } = require("../config/multer-connection");
const {
  AddProjectInfo,
  GetProjectInfo,
  AddProjectImages,
  GetProjectInfoById,
  GetlatestProjects,
  SaveProjectChanges,
  GetProjectInfoByIdForUI,
} = require("../Controller/ProjectController");
const { verifytoken } = require("../middlewares/auth-middleware");

ProjectRoute.post(
  "/AddProjectImages",
  verifytoken,
  (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      next();
    });
  },
  AddProjectImages
);

ProjectRoute.post("/AddProjectInfo", verifytoken, AddProjectInfo);
ProjectRoute.get("/GetProjectInfo", GetProjectInfo);
ProjectRoute.get("/GetProjectById/:id", GetProjectInfoById);
ProjectRoute.post("/saveSelectedImageChanges/:id", SaveProjectChanges);
ProjectRoute.get("/GetLatestProjects", GetlatestProjects);
module.exports = ProjectRoute;

ProjectRoute.get("/GetProjectByIdForUI/:id", GetProjectInfoByIdForUI);
