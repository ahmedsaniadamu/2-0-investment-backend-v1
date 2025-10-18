export default (sequelize, DataTypes) => {
  const Investor = sequelize.define("Investors", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
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
  };

  return Investor;
};
