export default (sequelize, DataTypes) => {
  const Plan = sequelize.define("Plan", {
    index: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    minDeposit: DataTypes.DECIMAL(15, 2),
    maxDeposit: DataTypes.DECIMAL(15, 2),
    roi: DataTypes.STRING,
    visibility: DataTypes.BOOLEAN,
  });
  Plan.associate = (models) => {
    Plan.hasMany(models.Investment, { foreignKey: 'planId', as: 'investments' });
  };

  return Plan;
};
