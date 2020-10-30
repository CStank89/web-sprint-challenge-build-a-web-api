const express = require("express");
const projectRouter = require("./projectRouter.js");
const actionRouter = require("./actionRouter.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello it's working if this is on heroku" });
});

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

module.exports = server;
