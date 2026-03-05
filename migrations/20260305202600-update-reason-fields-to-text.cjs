'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('InvestorTransactions', 'reason', {
            type: Sequelize.TEXT,
            allowNull: true,
        });
        await queryInterface.changeColumn('InvestorKycRequests', 'reason', {
            type: Sequelize.TEXT,
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('InvestorTransactions', 'reason', {
            type: Sequelize.STRING,
            allowNull: true,
        });
        await queryInterface.changeColumn('InvestorKycRequests', 'reason', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    }
};
