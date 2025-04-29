const AdminModel = require("../Models/Admin");
const dbgr = require("debug")("development:Admin");
const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");
const Admin = require("../Models/Admin");
require("dotenv").config();

const maxAge = 1000 * 60 * 60 * 24 * 3;
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

module.exports.CreateAdmin = async (req, res) => {
  try {
    const existingUsers = await AdminModel.find({});
    if (existingUsers.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Admin user already exists" });
    }

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username, email, and password",
      });
    }

    const user = await AdminModel.findOne({ email });
    if (user)
      return res.status(202).send("User with the same email already existed");

    const admin = await AdminModel.create({
      username,
      email,
      password,
      admin: true,
    });

    res.cookie(
      "jwt",
      createToken(admin.email, admin._id, {
        secure: true,
        sameSite: "none",
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true on Vercel
        sameSite: "None", // must be 'None' for cross-site
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      }
    );

    res.status(200).json({ admin });
  } catch (error) {
    dbgr("Error from (MODELS->AdminRoute) /create");
  }
};

module.exports.LoginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AdminModel.findOne({ email });
    if (!user) return res.status(202).send("Invalid email or password.");

    const auth = await compare(password, user.password);
    if (!auth) return res.status(202).send("Invalid email or password.");

    res.cookie(
      "jwt",
      createToken(admin.email, admin._id, {
        secure: true,
        sameSite: "none",
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true on Vercel
        sameSite: "None", // must be 'None' for cross-site
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      }
    );

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    dbgr("Error from (MODELS->AdminRoute) /login");
  }
};

module.exports.getAdminInfo = async (req, res) => {
  try {
    const { userId } = req;
    const admin = await AdminModel.findById(userId);
    if (!admin)
      return res.status(202).send("Enter email and password to proceed.");

    res.status(200).json({ admin });
  } catch (error) {
    dbgr("Error from (MODELS->AdmnRoute) /getUserInfo");
  }
};

module.exports.LogoutAdmin = async (req, res) => {
  try {
    const { userId } = req;
    const user = await AdminModel.findById(userId);
    if (!user) return res.status(202).send("Unauthenticated user detected");

    res.cookie("jwt", "", {
      secure: true,
      sameSite: "none",
    });

    res.status(200).send("Logout Successfully");
  } catch (error) {
    dbgr("Error from (MODELS->AdminRoute) /logout");
  }
};

module.exports.handleFalseAdminCreation = async (req, res) => {
  try {
    res.status(202).send("You are not allowed to create an account.");
  } catch (error) {
    dbgr(
      "Error from (MODELS->AdminRoute) /create (handle false admin creation)"
    );
  }
};
