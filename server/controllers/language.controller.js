const db = require("../models");
const config = require("../config/auth.config");
const language = require("../models/language")(db.sequelize, db.Sequelize);
const Operation = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../helpers/paginationHelper");

class languageController {
  /*
   * Add Action
   */
  add = (request, response) => {
    language
      .create(request.body)
      .then((studylevel) => {
        response.send(studylevel);
      })
      .catch((error) => {
        response.status(500).send({
          message:
            error.message ||
            "une erreur s'est produite lors de l'ajout d'une langue",
        });
      });
  };
  /*
   * Delete Action
   */
  delete = (request, response) => {
    language
      .destroy({
        where: {
          id: request.params.id,
        },
      })
      .then((num) => {
        response.send({
          message:
            num > 0 ? "langue est supprimé" : "langue n'est pas supprimé",
        });
      })
      .catch((error) =>
        response.status(500).send({
          message: error.message,
        })
      );
  };
  /*
   * Edit Action
   */
  edit = (request, response) => {
    language
      .update(request.body, {
        where: {
          id: request.params.id,
        },
      })
      .then((num) => {
        response.send({
          message: num > 0 ? "langue est modifié" : "langue n'est pas modifié",
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * Delete Action
   */
  find = (request, response) => {
    language
      .findByPk(request.params.id)
      .then((studylevel) => {
        if (studylevel) {
          response.send(studylevel);
        } else {
          response.send({
            message: "langue n'existe pas",
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
   * Find All Action
   */
  findAll = (request, response) => {
    //get the query params
    const { page, size } = request.query;
    const { limit, offset } = getPagination(page, size);
    language
      .findAndCountAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      })
      .then((data) => {
        const result = getPagingData(data, page, limit, "langues");
        response.send(result);
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
}

module.exports = new languageController();
