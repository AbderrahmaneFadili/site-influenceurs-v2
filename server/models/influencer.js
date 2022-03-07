"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Influencer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //Influencer belongs to studyLevel
      this.belongsTo(models.StudyLevel, {
        foreignKey: "studyLevelId",
        as: "studyLevel",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });

      //Influencer has many instagram history
      this.hasMany(models.InstagramAPIHistory, {
        as: "InstagramAPIHistorys",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      //Influencer belongs to many Languaues
      this.belongsToMany(models.Language, {
        through: "language_influencer",
        as: "influencers",
        foreignKey: "influencerId",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });

      //Influencer belongs to many Interests
      this.belongsToMany(models.Interest, {
        through: "language_influencer",
        as: "Influencers",
        foreignKey: "influencerId",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Influencer.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      emailVerification: DataTypes.BOOLEAN,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      gender: DataTypes.STRING,
      username_instagram: DataTypes.STRING,
      username_facebook: DataTypes.STRING,
      username_youtube: DataTypes.STRING,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      street: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      familySituation: DataTypes.STRING,
      numberChildren: DataTypes.INTEGER,
      studyLevelId: DataTypes.INTEGER,
      profession: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Influencer",
    }
  );
  return Influencer;
};
