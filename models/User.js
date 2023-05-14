// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_type: {
            type: DataTypes.STRING,
        },
    });

    User.associate = (models) => {
        User.hasOne(models.Customer, {
            onDelete: "cascade",
        });
        User.hasOne(models.Doctor, {
            onDelete: "cascade",
        });
        User.hasOne(models.Employee, {
            onDelete: "cascade",
        });
        User.hasMany(models.Contact, {
            onDelete: "cascade",
        });
    };
    return User;
};