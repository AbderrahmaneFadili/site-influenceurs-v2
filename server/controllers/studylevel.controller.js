const { verifySignUp, authJWT } = require("../middlewares");
const db = require("../models");
const StudyLevel = require("../models/studylevel")(db.sequelize, db.Sequelize);
const Operation = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../helpers/paginationHelper");

class StudyLevelController {
  /*
   * Add Study level Action
   */
  add = (request, response) => {
    StudyLevel.create(request.body)
      .then((studylevel) => {
        response.send(studylevel);
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };

  /*
   * Delete Study Level Action
   */
  delete = (request, response) => {
    StudyLevel.destroy({
      where: {
        id: request.params.id,
      },
    })
      .then((num) => {
        response.send({
          message:
            num > 0
              ? "niveau d'étude est supprimé"
              : "niveau d'étude n'est pas supprimé",
        });
      })
      .catch((error) =>
        response.status(500).send({
          message: error.message,
        })
      );
  };
  /*
   * Update Action
   */
  update = (request, response) => {
    StudyLevel.update(request.body, {
      where: {
        id: request.params.id,
      },
    })
      .then((num) => {
        response.send({
          message:
            num > 0
              ? "niveau d'étude est modifié"
              : "niveau d'étude n'est pas modifié",
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * find study level
   */
  find = (request, response) => {
    StudyLevel.findByPk(request.params.id)
      .then((studylevel) => {
        if (studylevel) {
          response.send(studylevel);
        } else {
          response.send({
            message: "niveau d'étude n'existe pas",
          });
        }
      })
      .catch((err) => {
        response.status(500).send({
          message: err.message,
        });
      });
  };

  /*
   * find all study leveles with pagination
   */
  findAll = (request, response) => {
    //get the query params
    const { page, size } = request.query;
    const { limit, offset } = getPagination(page, size);
    StudyLevel.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    })
      .then((data) => {
        const result = getPagingData(data, page, limit, "studyLevels");
        response.send(result);
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
}

module.exports = new StudyLevelController();
