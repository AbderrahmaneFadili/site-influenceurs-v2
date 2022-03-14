"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Influencers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      emailVerification: {
        type: Sequelize.BOOLEAN,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      username_instagram: {
        type: Sequelize.STRING,
      },
      username_facebook: {
        type: Sequelize.STRING,
      },
      username_youtube: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      street: {
        type: Sequelize.STRING,
      },
      zipCode: {
        type: Sequelize.STRING,
      },
      familySituation: {
        type: Sequelize.STRING,
      },
      numberChildren: {
        type: Sequelize.INTEGER,
      },
      studyLevelId: {
        type: Sequelize.INTEGER,
        references: {
          // Influencer belongs To Study Level
          model: "Influencers",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      profession: {
        type: Sequelize.STRING,
      },
      rememberToken: {
        type: Sequelize.STRING(500),
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
    await queryInterface.dropTable("Influencers");
  },
};
