// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const Doctor = sequelize.define("Doctor", {
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
    Doctor.associate = (models) => {
        Doctor.hasMany(models.Rating, {
            onDelete: "cascade",
        });
        Doctor.hasMany(models.Appointment, {
            onDelete: "cascade",
        });
        
       
    };

    return Doctor;
};