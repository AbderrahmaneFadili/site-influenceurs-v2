"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Client, {
        foreignKey: "clientId",
        as: "client",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      //Campaign belongs to many interest
      this.belongsToMany(models.Interest, {
        through: "campaign_interest",
        as: "Campaigns",
        foreignKey: "campaignId",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });

      //Campaign has many photos
      this.hasMany(models.CampaignPhoto, {
        as: "campaignPhotos",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Campaign.init(
    {
      clientId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      presence: DataTypes.BOOLEAN,
      numberInfluencers: DataTypes.INTEGER,
      description: DataTypes.STRING,
      hashtage: DataTypes.STRING,
      accounts: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Campaign",
    }
  );
  return Campaign;
};
