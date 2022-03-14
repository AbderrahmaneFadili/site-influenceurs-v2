const { verifySignUp, authJWT } = require("../../middlewares");
const languageController = require("../../controllers/language.controller");
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

  //POST /api/languages/add
  router.post("/add", [authJWT.verifyToken], languageController.add);
  //PUT /api/languages/edit
  router.put("/edit/:id", [authJWT.verifyToken], languageController.edit);
  //GET /api/languages/find
  router.get("/find/:id", [authJWT.verifyToken], languageController.find);
  //DELETE /api/languages/delete
  router.delete(
    "/delete/:id",
    [authJWT.verifyToken],
    languageController.delete
  );
  //GET /api/languages/all
  router.get("/all", [authJWT.verifyToken], languageController.findAll);

  app.use("/api/languages", router);
};
