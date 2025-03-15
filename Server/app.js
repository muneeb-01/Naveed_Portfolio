const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const dbgr = require("debug")("development:app");
require("./src/config/mongoose-connection");
const AdminRoute = require("./src/Routes/AdminRoute");
const DataRoute = require("./src/Routes/DataRoute");
const ProjectRoute = require("./src/Routes/ProjectRoute");

const app = express();
const PORT = process.env.PORT;

const Origin = process.env.ORIGIN;
app.use(
  cors(
    {
    origin: [Origin],
    methods: ["POST", "PUT", "PATCH", "DELETE", "GET"],
    credentials: true,
  }
)
);

app.use(cookieParser());
app.use(express.json());

app.use("/uploads/projects", express.static("./public/uploads/projects"));

app.use("/api/admin", AdminRoute);
app.use("/api/Data", DataRoute);
app.use("/api/projects", ProjectRoute);

const server = app.listen(PORT, () => {
  dbgr(`Listening on http://localhost:${PORT}`);
});
