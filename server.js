const express = require("express");
const projectRouter = require("./projectRouter.js");
const actionsRouter = require("./actionsRouter.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello it's working if this is on heroku" });
});

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionsRouter);

module.exports = server;
