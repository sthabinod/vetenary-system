// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const Pet = sequelize.define("Pet", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       
    });
    Pet.associate = (models) => {
        Pet.hasMany(models.Customer, {
            onDelete: "cascade",
        });
        
      
    };

    return Pet;
};