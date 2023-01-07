// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const Customer = sequelize.define("Customer", {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    Customer.associate = (models) => {
        Customer.hasMany(models.Appointment, {
            onDelete: "cascade",
        });
       
        
        Customer.hasMany(models.Rating, {
            onDelete: "cascade",
        });
        
        Customer.hasMany(models.Order, {
            onDelete: "cascade",
        });
    };

    return Customer;
};