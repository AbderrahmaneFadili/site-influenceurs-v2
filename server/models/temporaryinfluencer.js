"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TemporaryInfluencer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TemporaryInfluencer.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      emailVerification: DataTypes.BOOLEAN,
      rememberToken: DataTypes.STRING(500),
    },
    {
      sequelize,
      modelName: "TemporaryInfluencer",
    }
  );
  return TemporaryInfluencer;
};
