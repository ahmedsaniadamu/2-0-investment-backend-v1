'use strict'
module.exports = {
async up(queryInterface, Sequelize) {
  await queryInterface.createTable("InvestorTransactions", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: Sequelize.ENUM("deposit", "withdraw"),
      allowNull: false,
    },
    investmentGoal: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentMethod: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
    },
    investmentId: {
      type: Sequelize.UUID,
      references: { model: "Investments", key: "id" },
      onDelete: "CASCADE",
    },
    investorId: {
      type: Sequelize.UUID,
      references: { model: "Investors", key: "id" },
      onDelete: "CASCADE",
    },
    planId: {
      type: Sequelize.UUID,
      references: { model: "Plans", key: "id" },
      onDelete: "CASCADE",
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
  await queryInterface.dropTable("InvestorTransactions");
  }
}