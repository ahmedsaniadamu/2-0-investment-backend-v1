'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Plans', 'visibility', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false  
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Plans', 'visibility');
  }
};
