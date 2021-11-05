const express = require("express");
const apiRouter = express.Router();
const minionsRouter = require("./minions");
const ideasRouter = require("./ideas");
const meetingsRouter = require("./meetings");

//minions routes
apiRouter.use("/minions/", minionsRouter);
//ideas routes
apiRouter.use("/ideas/", ideasRouter);

//meetings routes
apiRouter.use("/meetings/", meetingsRouter);

module.exports = apiRouter;
