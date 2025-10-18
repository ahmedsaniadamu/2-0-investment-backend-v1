'use strict';

export async function up(queryInterface, Sequelize) {

  await queryInterface.addColumn('InvestorOtps', 'updatedAt', {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn('InvestorOtps', 'createdAt');
  await queryInterface.removeColumn('InvestorOtps', 'updatedAt');
}
