const { verifySignUp, authJWT } = require("../../middlewares");
const interestController = require("../../controllers/interest.controller");
const router = require("express").Router();

module.exports = (app) => {
  //POST /api/interests/add
  router.post("/add", [authJWT.verifyToken], interestController.add);
  //PUT /api/interests/edit
  router.put("/edit/:id", [authJWT.verifyToken], interestController.update);
  //GET /api/interests/find
  router.get("/find/:id", [authJWT.verifyToken], interestController.find);
  //DELETE /api/interests/delete
  router.delete(
    "/delete/:id",
    [authJWT.verifyToken],
    interestController.delete
  );
  //GET /api/interests/all
  router.get("/all", [authJWT.verifyToken], interestController.all);
  app.use("/api/interests", router);
};
