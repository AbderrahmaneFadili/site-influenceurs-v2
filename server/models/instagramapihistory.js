"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InstagramAPIHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // define association here
      this.belongsTo(models.Influencer, {
        foreignKey: "influencerId",
        as: "influencer",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  InstagramAPIHistory.init(
    {
      influencerId: DataTypes.INTEGER,
      influencerFullname: DataTypes.STRING,
      influencerUsername: DataTypes.STRING,
      influencerProfilePicture: DataTypes.STRING,
      biography: DataTypes.STRING,
      website: DataTypes.STRING,
      numberPosts: DataTypes.INTEGER,
      numberFolowers: DataTypes.INTEGER,
      numberFollowing: DataTypes.INTEGER,
      isBussiness: DataTypes.BOOLEAN,
      categorieBussiness: DataTypes.STRING,
      phoneBussiness: DataTypes.STRING,
      emailBussiness: DataTypes.STRING,
      addressBussiness: DataTypes.STRING,
      feeds: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "InstagramAPIHistory",
    }
  );
  return InstagramAPIHistory;
};
