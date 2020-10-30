const express = require("express");
const router = express.Router();
const projectModel = require("./data/helpers/projectModel.js");

router.get("/", (req, res) => {
  projectModel
    .get()
    .then((working) => {
      res.status(200).json({ working });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ message: "Unable to retrieve at this time" });
    });
});

router.post("/", (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(500).json({ message: "Please supply name and description" });
  } else {
    projectModel
      .insert(req.body)
      .then((working) => {
        res.status(201).json({ working });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Could not add at this time" });
      });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (!id || !changes) {
    res.status(500).json({ message: "Please supply ID and changes" });
  } else {
    projectModel
      .update(id, changes)
      .then((working) => {
        res.status(201).json({ working });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Could not find user" });
      });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({ message: "Must give id" });
  } else {
    projectModel
      .remove(id)
      .then((working) => {
        res.status(200).json({ message: "User deleted", working });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Could not delete at this time" });
      });
  }
});

router.get("/projectActions", (req, res) => {
  const { project_id } = req.body;
  console.log(project_id);
  if (!project_id) {
    res.status(500).json({ message: "Must supply project ID" });
  } else {
    projectModel
      .getProjectActions(project_id)
      .then((working) => {
        res.status(200).json({ working });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Error" });
      });
  }
});

module.exports = router;
