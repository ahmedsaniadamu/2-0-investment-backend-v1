"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Profiles", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    investorId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Investors",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    bankName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    accountNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    accountName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    kycStatus: {
      type: Sequelize.ENUM("pending", "verified", "rejected"),
      defaultValue: "pending",
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("Profiles");
}
