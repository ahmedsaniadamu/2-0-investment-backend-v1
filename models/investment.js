'use strict';
export default (sequelize, DataTypes) => {
  const Investment = sequelize.define('Investment', {
    index: { 
      allowNull: false, 
      autoIncrement: true, 
      type: DataTypes.INTEGER 
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    investorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    planId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    investmentGoal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agreement: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'active', 'completed', 'cancelled'),
      defaultValue: 'pending',
    },
  });

  Investment.associate = (models) => {
    Investment.belongsTo(models.Plan, { foreignKey: 'planId', as: 'plan' });
    Investment.belongsTo(models.Investors, { foreignKey: 'investorId', as: 'investor' });
  };

  return Investment;
};
