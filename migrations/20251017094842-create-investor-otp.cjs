'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
     await queryInterface.createTable('InvestorOtps', {
    id: { 
      allowNull: false, 
      autoIncrement: true, 
      primaryKey: true,
      type: Sequelize.INTEGER 
    },
    investorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Investors', key: 'id' },
      onDelete: 'CASCADE',
    },
    otp: { type: Sequelize.STRING, allowNull: false },
    expiresAt: { type: Sequelize.DATE, allowNull: false },
    createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
  });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('InvestorOtps');
  },
};
