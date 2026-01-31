'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Investments', 'paymentStatus', {
      type: Sequelize.ENUM('n/a', 'pending', 'paid', 'failed'),
      defaultValue: 'n/a',
      allowNull: false
    });
    await queryInterface.addColumn('Investments', 'onboardingLink', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Investments', 'loginLink', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Investments', 'paymentStatus');
    await queryInterface.removeColumn('Investments', 'onboardingLink');
    await queryInterface.removeColumn('Investments', 'loginLink');
  }
};
