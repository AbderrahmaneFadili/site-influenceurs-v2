//verification dans sign up
const db = require("../models");
const Manager = require("../models/manager")(db.sequelize, db.Sequelize);

//check duplicate email
const checkDuplicateEmail = (request, response, next) => {
  Manager.findOne({
    email: request.body.email,
  }).then((manager) => {
    if (manager) {
      response.status(404).send({
        message: "Échoué! cet email est déjà utilisé",
      });
      return;
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicateEmail,
};

module.exports = verifySignUp;
