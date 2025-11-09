export default (sequelize, DataTypes) => {
  const InvestorTransaction = sequelize.define("InvestorTransaction", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("deposit", "withdraw"),
      allowNull: false,
    },
    investmentGoal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reason: {
    type: DataTypes.STRING,
    allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
    },
  });

  InvestorTransaction.associate = (models) => {
    InvestorTransaction.belongsTo(models.Investment, {
      foreignKey: "investmentId",
    });
    InvestorTransaction.belongsTo(models.Investors, {
      foreignKey: "investorId",
    });
    InvestorTransaction.belongsTo(models.Plan, {
      foreignKey: "planId",
    });
  };

  return InvestorTransaction;
};
