'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('InvestorTransactions', 'reason', {
      type: Sequelize.STRING,
      allowNull: true,  
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('InvestorTransactions', 'reason');
  }
};
