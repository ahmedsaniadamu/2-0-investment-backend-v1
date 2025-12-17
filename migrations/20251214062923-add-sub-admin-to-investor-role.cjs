'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Investors', 'role', {
      type: Sequelize.ENUM('admin', 'investor', 'sub-admin'),
      allowNull: false,
      defaultValue: 'investor',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Investors', 'role', {
      type: Sequelize.ENUM('admin', 'investor'),
      allowNull: false,
      defaultValue: 'investor',
    });
    // if Sequelize doesn’t handle cleanup automatically:
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Investors_role";');
  },
};
