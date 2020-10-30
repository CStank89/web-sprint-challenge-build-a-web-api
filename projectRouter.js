const express = require("express");

const router = express.Router();

const projectModel = require("./data/helpers/projectModel");

router.get("/", (req, res) => {
  projectModel
    .get()
    .then((working) => {
      res.status(200).json({ working });
    })
    .catch((error) => {
      res
        .status(404)
        .json({ message: "Unable to retrieve data at the moment" });
    });
});
