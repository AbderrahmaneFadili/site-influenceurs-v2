const db = require("../models");
const config = require("../config/auth.config");
const Campaign = require("../models/campaign")(db.sequelize, db.Sequelize);
const CampaignInterest = require("../models/campaigninterest")(
  db.sequelize,
  db.Sequelize
);
const Operation = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../helpers/paginationHelper");

class CampaignInterestController {
  /*
   * GET find by campaign
   */
  findByCampaign = (request, response) => {
    const campaignId = request.params.id;
    CampaignInterest.findAll({
      where: {
        campaignId,
      },
    })
      .then((campaignInterests) => {
        response.send(campaignInterests);
      })
      .catch((err) => {
        response.status(500).send({
          message: err.message,
        });
      });
  };
}

module.exports = new CampaignInterestController();
