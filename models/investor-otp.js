'use strict';

export default (sequelize, DataTypes) => {
  const InvestorOtps = sequelize.define('InvestorOtps', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    investorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Investors',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'InvestorOtps',
    timestamps: true,
  });

  InvestorOtps.associate = (models) => {
    InvestorOtps.belongsTo(models.Investors, {
      foreignKey: 'investorId',
      as: 'investor',
    });
  };

  return InvestorOtps;
};
