'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('InvestorTransactions', 'transactionStatus', {
      type: Sequelize.ENUM(
        'requires_payment_method',
        'requires_confirmation',
        'requires_action',
        'processing',
        'succeeded',
        'failed',
        'canceled'
      ),
      allowNull: false,
      defaultValue: 'processing',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('InvestorTransactions', 'transactionStatus');
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_InvestorTransactions_transactionStatus";'
      );
    }
  },
};
