const db = require("../models");
const config = require("../config/auth.config");
const Manager = require("../models/Manager")(db.sequelize, db.Sequelize);
const Operation = db.Sequelize.Operation;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthController {
  /*
   * POST : /api/auth/signup
   * Sign up Action
   */
  signup(request, response) {
    //Create/Register the manager
    Manager.create({
      fullName: request.body.fullName,
      email: request.body.email,
      password: bcrypt.hashSync(request.body.password, 8),
    })
      .then((manager) => {
        if (manager) {
          response.send({
            manager: "le manager est enregistré avec succès",
            ...manager,
          });
        }
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message || "Le Manager ne peut pas s'inscrire",
        });
      });
  }
}

module.exports = new AuthController();
