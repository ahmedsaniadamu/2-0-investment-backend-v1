export default (sequelize, DataTypes) => {
  const Plan = sequelize.define("Plan", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    minDeposit: DataTypes.DECIMAL(15, 2),
    maxDeposit: DataTypes.DECIMAL(15, 2),
    roi: DataTypes.STRING,
  });

  return Plan;
};
