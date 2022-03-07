"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudyLevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Influencer, {
        as: "influencers",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  StudyLevel.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StudyLevel",
    }
  );
  return StudyLevel;
};
