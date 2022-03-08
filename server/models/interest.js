"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Interest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //Interest belongs to many influencer
      this.belongsTo(models.Influencer, {
        through: "language_influencer",
        foreignKey: "interestId",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });

      //Interest belongs to many Compaign
      this.belongsTo(models.Influencer, {
        through: "campaign_interest",
        foreignKey: "interestId",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Interest.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Interest",
    }
  );
  return Interest;
};
