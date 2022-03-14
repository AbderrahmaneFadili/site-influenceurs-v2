const { verifySignUp, authJWT } = require("../../middlewares");
const studyLevelController = require("../../controllers/studylevel.controller");
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

  //POST Add
  router.post("/add", [authJWT.verifyToken], studyLevelController.add);
  //DELETE delete
  router.delete(
    "/delete/:id",
    [authJWT.verifyToken],
    studyLevelController.delete
  );
  //GET find
  router.get("/find/:id", [authJWT.verifyToken], studyLevelController.find);
  //GET find all
  router.get("/all", [authJWT.verifyToken], studyLevelController.findAll);
  //PUT update
  router.put("/edit/:id", [authJWT.verifyToken], studyLevelController.update);

  app.use("/api/studylevels", router);
};
