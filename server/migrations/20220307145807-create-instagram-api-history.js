"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("InstagramAPIHistories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      influencerId: {
        type: Sequelize.INTEGER,
        references: {
          // Instagram API History belongsTo Influencer
          model: "Influencers",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      influencerFullname: {
        type: Sequelize.STRING,
      },
      influencerUsername: {
        type: Sequelize.STRING,
      },
      influencerProfilePicture: {
        type: Sequelize.STRING,
      },
      biography: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      numberPosts: {
        type: Sequelize.INTEGER,
      },
      numberFolowers: {
        type: Sequelize.INTEGER,
      },
      numberFollowing: {
        type: Sequelize.INTEGER,
      },
      isBussiness: {
        type: Sequelize.BOOLEAN,
      },
      categorieBussiness: {
        type: Sequelize.STRING,
      },
      phoneBussiness: {
        type: Sequelize.STRING,
      },
      emailBussiness: {
        type: Sequelize.STRING,
      },
      addressBussiness: {
        type: Sequelize.STRING,
      },
      feeds: {
        type: Sequelize.JSON,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("InstagramAPIHistories");
  },
};
