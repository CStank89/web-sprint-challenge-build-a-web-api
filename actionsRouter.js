const express = require("express");
const router = express.Router();
const actionModel = require("./data/helpers/actionModel");

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({ message: "Must have ID" });
  } else {
    actionModel
      .get(id)
      .then((working) => {
        res.status(200).json({ working });
      })
      .catch((error) => {
        res.status(404).json({ message: "Your request isnt allowed" });
      });
  }
});

router.post("/", (req, res) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res
      .status(500)
      .json({ message: "Must provide project ID, description and notes" });
  } else if (description.length > 127) {
    res
      .status(500)
      .json({ message: "Description must be less than 128 characters" });
  } else {
    actionModel
      .insert(req.body)
      .then((working) => {
        res.status(201).json({ working });
      })
      .catch((error) => {
        console.log(error);
        res
          .status(404)
          .json({ message: "Could not complete your request at this time" });
      });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (!id) {
    res.status(500).json({ message: "Must provide ID" });
  } else {
    actionModel
      .update(id, changes)
      .then((working) => {
        res.status(200).json({ working });
      })
      .catch((error) => {
        res.status(404).json({ message: "There was an error" });
      });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({ message: "Must provide ID" });
  } else {
    actionModel
      .remove(id)
      .then((working) => {
        res.status(200).json({ working });
      })
      .catch((error) => {
        console.log(error);
        res
          .status(404)
          .json({ message: "there was an error deleting at this time" });
      });
  }
});

module.exports = router;
