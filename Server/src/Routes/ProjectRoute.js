const express = require("express");
const ProjectRoute = express.Router();
const {
  AddProjectInfo,
  GetProjectInfo,
  AddProjectImages,
  GetProjectInfoById
  ,GetlatestProjects
} = require("../Controller/ProjectController");
const { uploadMultiple } = require("../config/multer-connection");
const { verifytoken } = require("../middlewares/auth-middleware");

ProjectRoute.post(
  "/AddProjectImages",
  verifytoken,
  uploadMultiple,
  AddProjectImages
);
ProjectRoute.post("/AddProjectInfo", verifytoken, AddProjectInfo);
ProjectRoute.get("/GetProjectInfo", GetProjectInfo);
ProjectRoute.get("/GetProjectById/:id", GetProjectInfoById);
ProjectRoute.get("/GetLatestProjects", GetlatestProjects)

module.exports = ProjectRoute;
