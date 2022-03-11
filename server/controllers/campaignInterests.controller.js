const db = require("../models");
const config = require("../config/auth.config");
const CampaignInterest = require("../models/campaigninterest")(
  db.sequelize,
  db.Sequelize
);
const Operation = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../helpers/paginationHelper");

class CampaignInterestController {
  /*
   * POST create campaign
   */
  create = (request, response) => {
    const { interestId, campaignId } = request.query;

    CampaignInterest.create({
      interestId: parseInt(interestId),
      campaignId: parseInt(campaignId),
    })
      .then((campaignInterest) => response.send(campaignInterest))
      .catch((error) =>
        response.status(500).send({
          message: error.message,
        })
      );
  };
  /*
   * GET find campaign interest by campaign interest id
   */
  find = (request, response) => {
    CampaignInterest.findByPk(request.params.id)
      .then((campaignInterest) => response.send(campaignInterest))
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
}

module.exports = new CampaignInterestController();
