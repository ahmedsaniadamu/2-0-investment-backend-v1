'use strict';

export default (sequelize, DataTypes) => {
  const InvestorOtps = sequelize.define('InvestorOtps', {
    index: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
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
