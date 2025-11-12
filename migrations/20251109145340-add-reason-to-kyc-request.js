'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('InvestorKycRequests', 'reason', {
      type: Sequelize.STRING,
      allowNull: true,  
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('InvestorKycRequests', 'reason');
  }
};
