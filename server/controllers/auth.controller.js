const db = require("../models");
const config = require("../config/auth.config");
const Manager = require("../models/manager")(db.sequelize, db.Sequelize);
const Operation = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthController {
  /*
   * POST : /api/auth/signup
   * Sign up Action
   */
  signup = (request, response) => {
    //Create/Register the manager
    Manager.create({
      fullName: request.body.fullName,
      email: request.body.email,
      password: bcrypt.hashSync(request.body.password, 8),
    })
      .then((manager) => {
        if (manager) {
          response.send({
            message: "le manager est enregistré avec succès",
            manager: {
              fullName: manager.fullName,
              email: manager.email,
              createdAt: manager.createdAt,
              updatedAt: manager.updatedAt,
            },
          });
        }
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message || "Le Manager ne peut pas s'inscrire",
        });
      });
  };
  /*
   * POST : /api/auth/signin
   * Sign in Action
   */
  signin = (request, response) => {
    //Find User by Email
    Manager.findOne({
      where: {
        email: request.body.email,
      },
    })
      .then((manager) => {
        if (!manager) {
          response.status(404).send({
            message: "Utilisateur non trouvé!",
          });
          return;
        }
        //compare the two passwords
        const passwordIsValid = bcrypt.compareSync(
          request.body.password,
          manager.password
        );

        if (!passwordIsValid) {
          //return Invalid Password message
          response.status(404).send({
            accessToken: null,
            message: "Mot de passe incorrect",
          });
        } else {
          let token = jwt.sign({ id: manager.id }, config.secret, {
            expiresIn: 86400, // 24 hours,
          });

          //return the manager
          response.status(200).send({
            fullName: manager.fullName,
            email: manager.email,
            accessToken: token,
          });
        }
      })
      .catch((err) => {
        response.status(500).send({
          message: err.message,
        });
      });
  };
}

module.exports = new AuthController();
