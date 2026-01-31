'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addIndex('InvestorTransactions', ['transactionId'], {
            unique: true,
            allowNull: true,
            where: {
                transactionId: {
                    [Sequelize.Op.ne]: null
                }
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeIndex('InvestorTransactions', ['transactionId']);
    }
};
