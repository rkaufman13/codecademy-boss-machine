const express = require("express");
const ideasRouter = express.Router();

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db.js");

//middleware for ideas route
const checkMillionDollarIdea = require("./checkMillionDollarIdea.js");

ideasRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("ideas"));
});

ideasRouter.get("/:ideaid", (req, res, next) => {
  const getIdeaById = getFromDatabaseById("ideas", req.params.ideaid);
  if (getIdeaById) {
    res.send(getIdeaById);
  } else {
    res.status(404).send();
  }
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  const newIdea = req.body;
  addToDatabase("ideas", newIdea);
  res.status(201).send(newIdea);
});

ideasRouter.put("/:ideaid", (req, res, next) => {
  const getIdeaById = getFromDatabaseById("ideas", req.params.ideaid);
  if (getIdeaById) {
    const updatedIdea = req.body;
    updateInstanceInDatabase("ideas", updatedIdea);
    res.status(200).send(updatedIdea);
  } else {
    res.status(404).send();
  }
});

ideasRouter.delete("/:ideaid", (req, res) => {
  const getIdeaById = getFromDatabaseById("ideas", req.params.ideaid);
  if (getIdeaById) {
    deleteFromDatabasebyId("ideas", getIdeaById.id);
    res.status(204).send(getAllFromDatabase("ideas"));
  } else {
    res.status(404).send();
  }
});

module.exports = ideasRouter;
