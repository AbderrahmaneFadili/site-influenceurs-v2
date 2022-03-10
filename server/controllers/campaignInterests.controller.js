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
}

module.exports = new CampaignInterestController();
