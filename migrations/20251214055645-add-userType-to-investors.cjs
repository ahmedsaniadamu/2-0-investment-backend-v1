"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Investors", "userType", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "investor",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Investors", "userType");
  },
};
