export default (sequelize, DataTypes) => {
  const Investor = sequelize.define("Investors", {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("admin", "investor"),
      defaultValue: "investor",
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  });

  Investor.associate = (models) => {
    Investor.hasMany(models.InvestorOtps, {
      foreignKey: 'investorId',
      as: 'otps',
      onDelete: 'CASCADE',
    });
    Investor.hasMany(models.Investment, {
      foreignKey: 'investorId',
      as: 'investments',
      onDelete: 'CASCADE',
    });
  };

  return Investor;
};
