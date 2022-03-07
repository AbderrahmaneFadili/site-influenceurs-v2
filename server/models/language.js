"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //Lenguage belong to many influencer
      this.belongsToMany(models.Influencer, {
        through: "language_influencer",
        as: "Languages",
        foreignKey: "languageId",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Language.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Language",
    }
  );
  return Language;
};
