"use strict";
export default (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
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
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kycStatus: {
      type: DataTypes.ENUM("pending", "verified", "rejected"),
      defaultValue: "pending",
    },
    stripeAccountId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accountStatus: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  // Association
  Profile.associate = (models) => {
    Profile.belongsTo(models.Investors, { foreignKey: "investorId", as: "investor" });
    Profile.belongsTo(models.InvestorKycRequest, {
      foreignKey: "investorId", as: "investorKycRequest",
      targetKey: "investorId",
    });
  };

  return Profile;
};
