'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('InvestorTransactions', 'payoutStatus', {
      type: Sequelize.ENUM('success', 'failed', 'pending'),
      defaultValue: 'pending',
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('InvestorTransactions', 'payoutStatus');
  }
};
