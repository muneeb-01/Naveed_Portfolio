const express = require("express");
const AdminRoute = express.Router();
const { verifytoken } = require("../middlewares/auth-middleware");
const {
  CreateAdmin,
  LoginAdmin,
  getAdminInfo,
  LogoutAdmin,
  handleFalseAdminCreation,
} = require("../Controller/adminController");

AdminRoute.post("/create", CreateAdmin);
AdminRoute.post("/login", LoginAdmin);
AdminRoute.get("/adminInfo", verifytoken, getAdminInfo);
AdminRoute.get("/Logout", verifytoken, LogoutAdmin);

module.exports = AdminRoute;
