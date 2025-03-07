const express = require("express");
const DataRoute = express.Router();
const { verifytoken } = require("../middlewares/auth-middleware");
const {
  AddLandingPageInfo,
  GetLandingPageInfo,
} = require("../Controller/DataController");

DataRoute.post("/AddLandingPageInfo", verifytoken, AddLandingPageInfo);
DataRoute.get("/GetLandingPageInfo", GetLandingPageInfo);

module.exports = DataRoute;
