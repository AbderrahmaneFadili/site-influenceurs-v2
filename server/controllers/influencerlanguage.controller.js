const db = require("../models");
const config = require("../config/auth.config");
const InfluencerLanguage = require("../models/languageinfluencer")(
  db.sequelize,
  db.Sequelize
);
const Operation = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../helpers/paginationHelper");

class InfluencerLanguageController {
  /*
   * Add Influencer Language
   */
  add = (request, response) => {
    InfluencerLanguage.create(request.body)
      .then((influencerlng) => response.send(influencerlng))
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * Find Influencer Language
   */
  find = (request, response) => {
    InfluencerLanguage.findByPk(request.params.id)
      .then((influencerlng) => response.send(influencerlng))
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * Delete Influencer Language
   */
  delete = (request, response) => {
    InfluencerLanguage.destroy({
      where: {
        languageId: request.params.languageId,
      },
    })
      .then((num) => {
        if (num > 0) {
          response.send({
            message: "la langue de l'influenceur est supprimée",
          });
        } else {
          response.send({
            message: "la langue de l'influenceur n'est pas supprimée",
          });
        }
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * Update Influencer Language
   */
  edit = (request, response) => {
    InfluencerLanguage.update(request.body, {
      where: {
        id: request.params.id,
      },
    })
      .then((affectedCount) => {
        if (affectedCount > 0) {
          response.send({
            message: "la langue de l'influenceur est mise à jour",
          });
        } else {
          response.status(404).send({
            message: "la langue de l'influenceur n'est pas mise à jour",
          });
        }
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * find all Influencer Language
   */
  findAll = (request, response) => {
    //get the query params
    const { page, size } = request.query;
    const { limit, offset } = getPagination(page, size);
    InfluencerLanguage.findAndCountAll({
      limit,
      offset,
    })
      .then((data) => {
        const result = getPagingData(
          data,
          page,
          limit,
          "langues d'influenceur"
        );
        response.send(result);
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
}

module.exports = new InfluencerLanguageController();
