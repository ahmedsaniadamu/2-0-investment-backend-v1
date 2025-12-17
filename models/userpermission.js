export default (sequelize, DataTypes) => {
    const UserPermissions = sequelize.define("UserPermissions", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        permissionId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });

       UserPermissions.associate = (models) => {
        UserPermissions.belongsTo(models.Investors, {
            foreignKey: "userId",
            as: "user",
        });

        UserPermissions.belongsTo(models.Permission, {
            foreignKey: "permissionId",
            as: "permission",
        });
    };

    return UserPermissions;
};
