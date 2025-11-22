"use strict";

export default (sequelize, DataTypes) => {
  const InvestorKycRequest = sequelize.define("InvestorKycRequest", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    investorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Investors",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
    },
    documents: {
      type: DataTypes.JSONB, 
      allowNull: false,
      defaultValue: [],
    },
  });

  InvestorKycRequest.associate = (models) => {
    InvestorKycRequest.belongsTo(models.Investors, {
      foreignKey: "investorId",
      as: "investor",
    });
    InvestorKycRequest.hasOne(models.Profile, {
      foreignKey: 'investorId',
      as: 'investorKycRequest',
    });
  };

  return InvestorKycRequest;
};
