export default (sequelize, DataTypes) => {
    const Permission = sequelize.define("Permission", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        module: {
            type: DataTypes.STRING,
        },
    });

    Permission.associate = (models) => {
        Permission.belongsToMany(models.Investors, {
            through: "UserPermissions",
            foreignKey: "permissionId",
            as: "users",
        });
    };
    return Permission;
};
