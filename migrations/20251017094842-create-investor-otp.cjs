'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
     await queryInterface.createTable('InvestorOtps', {
    index: { 
      allowNull: false, 
      autoIncrement: true, 
      type: Sequelize.INTEGER 
    },
     id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
    investorId: {
      type: Sequelize.UUID,
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
