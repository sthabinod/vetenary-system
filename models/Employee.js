// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const Employee = sequelize.define("Employee", {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        qualification: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Employee.associate = (models) => {
        Employee.hasMany(models.Product, {
            onDelete: "cascade",
        });
    };

    return Employee;
};