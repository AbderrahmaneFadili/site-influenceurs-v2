const { verifySignUp, authJWT } = require("../../middlewares");
const influencerInterestController = require("../../controllers/influencerinterest.controller");
const express = require("express");
const router = express.Router();

module.exports = (app) => {
  //use header middleware
  app.use((request, response, next) => {
    response.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //POST
  router.post("/add", [authJWT.verifyToken], influencerInterestController.add);
  //DELETE
  router.delete(
    "/delete",
    [authJWT.verifyToken],
    influencerInterestController.delete
  );
  //UPDATE
  router.put(
    "/edit/:id",
    [authJWT.verifyToken],
    influencerInterestController.edit
  );
  //GET
  router.get(
    "/find/:id",
    [authJWT.verifyToken],
    influencerInterestController.find
  );
  //GET
  router.get(
    "/all",
    [authJWT.verifyToken],
    influencerInterestController.findAll
  );

  app.use("/api/influencerInterests", router);
};
