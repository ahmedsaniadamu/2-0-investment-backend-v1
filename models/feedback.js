export default (sequelize, DataTypes) => {
    const Feedback = sequelize.define("Feedback", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        investorId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Investors',
                key: 'id'
            },
            onDelete: 'CASCADE',
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 5
            }
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        timestamps: true
    });

    Feedback.associate = (models) => {
        Feedback.belongsTo(models.Investors, {
            foreignKey: 'investorId',
            as: 'investor',
            onDelete: 'CASCADE',
        });
    };

    return Feedback;
};
