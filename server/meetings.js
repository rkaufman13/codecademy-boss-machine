const express = require("express");
meetingsRouter = express.Router();

const {
  createMeeting,
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase,
} = require("./db.js");

meetingsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("meetings"));
});

meetingsRouter.post("/", (req, res, next) => {
  const newMeeting = createMeeting();
  addToDatabase("meetings", newMeeting);
  res.status(201).send(newMeeting);
});

meetingsRouter.delete("/", (req, res) => {
  deleteAllFromDatabase("meetings");
  res.status(204).send(getAllFromDatabase("meetings"));
});

module.exports = meetingsRouter;
