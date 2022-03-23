const { verifySignUp, authJWT } = require("../../middlewares");
const influencerlanguageController = require("../../controllers/influencerlanguage.controller");
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
  router.post("/add", [authJWT.verifyToken], influencerlanguageController.add);
  //DELETE
  router.delete(
    "/delete",
    [authJWT.verifyToken],
    influencerlanguageController.delete
  );
  //GET
  router.get(
    "/find/:id",
    [authJWT.verifyToken],
    influencerlanguageController.find
  );
  //GET
  router.get(
    "/all",
    [authJWT.verifyToken],
    influencerlanguageController.findAll
  );
  //UPDATE
  router.put(
    "/edit/:id",
    [authJWT.verifyToken],
    influencerlanguageController.edit
  );

  app.use("/api/influencerlanguages", router);
};
