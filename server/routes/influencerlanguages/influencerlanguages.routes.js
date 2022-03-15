const { verifySignUp, authJWT } = require("../../middlewares");
const influencerLangaugeController = require("../../controllers/influencerlanguage.controller");
const router = require("express").Router();

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
  router.post("/add", [authJWT.verifyToken], influencerLangaugeController.add);
  //DELETE
  router.delete(
    "/delete",
    [authJWT.verifyToken],
    influencerLangaugeController.delete
  );
  //GET
  router.get(
    "/find/:id",
    [authJWT.verifyToken],
    influencerLangaugeController.find
  );
  //GET
  router.get(
    "/all",
    [authJWT.verifyToken],
    influencerLangaugeController.findAll
  );
  //UPDATE
  router.put(
    "/edit/:id",
    [authJWT.verifyToken],
    influencerLangaugeController.edit
  );

  app.use("/api/influencerLangauges", router);
};
