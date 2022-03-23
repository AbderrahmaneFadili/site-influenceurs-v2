"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("InterestInfluencers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      influencerId: {
        type: Sequelize.INTEGER,
        references: {
          //Influencer belongs to many influencers
          model: "Influencers",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      interestId: {
        type: Sequelize.INTEGER,
        //Interest belongs to many languages
        references: {
          model: "Interests",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
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
    await queryInterface.dropTable("InterestInfluencers");
  },
};
