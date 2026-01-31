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
    isWithdrawalRequest: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
    },
    transactionStatus: {
      type: DataTypes.ENUM("requires_payment_method", "requires_confirmation", "requires_action", "processing", "succeeded", "failed", "canceled"),
      defaultValue: "processing",
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    isPayout: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    payoutStatus: {
      type: DataTypes.ENUM('success', 'failed', 'pending'),
      defaultValue: 'pending',
      allowNull: true
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
