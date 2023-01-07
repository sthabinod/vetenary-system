// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const Vaccination = sequelize.define("Vaccination", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       
    });
    Vaccination.associate = (models) => {
        Vaccination.hasMany(models.Appointment, {
            onDelete: "cascade",
        });
        
      
    };

    return Vaccination;
};