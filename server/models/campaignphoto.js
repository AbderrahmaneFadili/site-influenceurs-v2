"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CampaignPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Campaign, {
        foreignKey: "compaignId",
        as: "campaign",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  CampaignPhoto.init(
    {
      link: DataTypes.STRING,
      compaignId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CampaignPhoto",
    }
  );
  return CampaignPhoto;
};
