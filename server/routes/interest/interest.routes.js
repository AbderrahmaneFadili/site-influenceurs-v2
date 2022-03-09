const { verifySignUp, authJWT } = require("../../middlewares");
const interestController = require("../../controllers/interest.controller");
const router = require("express").Router();

module.exports = (app) => {
  //POST /api/interests/add
  router.post("/add", [authJWT.verifyToken], interestController.add);
  //PUT /api/interests/edit
  router.put("/edit/:id", [authJWT.verifyToken], interestController.update);

  app.use("/api/interests", router);
};
