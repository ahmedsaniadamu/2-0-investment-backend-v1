'use strict';
module.exports = { 
  async  up(queryInterface, Sequelize) {
  await queryInterface.createTable('Investments', {
     index: { 
      allowNull: false, 
      autoIncrement: true, 
      type: Sequelize.INTEGER 
    },
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    investorId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'Investors', key: 'id' },
      onDelete: 'CASCADE',
    },
    planId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'Plans', key: 'id' },
      onDelete: 'CASCADE',
    },
    amount: {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: false,
    },
    paymentMethod: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    investmentGoal: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    agreement: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: Sequelize.ENUM('pending', 'active', 'completed', 'cancelled'),
      defaultValue: 'pending',
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    },
  });
},
async down(queryInterface) {
  await queryInterface.dropTable('Investments');
 }
}