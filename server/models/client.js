"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //Client has many compain
      this.hasMany(models.Compain, {
        as: "clients",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Client.init(
    {
      companyName: DataTypes.STRING,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      street: DataTypes.STRING,
      directorName: DataTypes.STRING,
      tel: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Client",
    }
  );
  return Client;
};
