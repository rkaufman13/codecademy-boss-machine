const express = require("express");
const minionsRouter = express.Router();

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db.js");

//middleware for checking existence of minions
minionsRouter.param("minionid", (req, res, next, minionid) => {
  const getMinionById = getFromDatabaseById("minions", minionid);
  console.log(getMinionById);
  if (!getMinionById) {
    res.status(404).send();
  } else {
    req.minion = getMinionById;
    next();
  }
});

//middleware for filtering work by minion.
const filterWorkByMinion = (req, res, next) => {
  const allWork = getAllFromDatabase("work");

  const minionWork = allWork.filter(
    (work) => work.minionId === String(req.minion.id)
  );
  if (minionWork) {
    req.minionWork = minionWork;
    next();
  } else {
    res.status(404).send();
  }
};

minionsRouter.get("/", (req, res, next) => {
  res.status(200).send(getAllFromDatabase("minions"));
});

minionsRouter.get("/:minionid", (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.post("/", (req, res, next) => {
  const newMinion = req.body;
  addToDatabase("minions", newMinion);
  res.status(201).send(newMinion);
});

minionsRouter.put("/:minionid", (req, res, next) => {
  const updatedMinion = req.body;
  updateInstanceInDatabase("minions", updatedMinion);
  res.status(200).send(updatedMinion);
});

minionsRouter.delete("/:minionid", (req, res) => {
  deleteFromDatabasebyId("minions", req.minion.id);
  res.status(204).send(getAllFromDatabase("minions"));
});

//minion work routes

minionsRouter.get("/:minionid/work", filterWorkByMinion, (req, res) => {
  res.status(200).send(req.minionWork);
});

minionsRouter.post("/:minionid/work", (req, res) => {
  const newWork = req.body;
  newWork.minionId = req.minion.id;
  addToDatabase("work", newWork);
  res.status(201).send(newWork);
});

minionsRouter.put("/:minionid/work/:workid", (req, res) => {
  const oldWork = getFromDatabaseById("work", req.params.workid);
  const newWork = req.body;

  if (oldWork) {
    if (oldWork.id === req.minion.id) {
      updateInstanceInDatabase("work", newWork);
      res.status(200).send(newWork);
    } else {
      res.status(400).send();
    }
  } else {
    res.status(404).send();
  }
});

minionsRouter.delete("/:minionid/work/:workid", (req, res) => {
  const workToDelete = getFromDatabaseById("work", req.params.workid);
  console.log(workToDelete);
  if (workToDelete) {
    if (Number(workToDelete.minionId) === Number(req.minion.id)) {
      deleteFromDatabasebyId("work", workToDelete.id);
      res.status(204).send();
    } else {
      res.status(400).send();
    }
  } else {
    res.status(404).send();
  }
});

module.exports = minionsRouter;
