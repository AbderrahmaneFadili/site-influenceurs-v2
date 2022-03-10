"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CampaignInterest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CampaignInterest.init(
    {
      campaignId: DataTypes.INTEGER,
      interestId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CampaignInterest",
    }
  );
  return CampaignInterest;
};
