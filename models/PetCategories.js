// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const PetCategories = sequelize.define("PetCategories", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    PetCategories.associate = (models) => {
        PetCategories.hasMany(models.Pet, {
            onDelete: "cascade",
        });
    };
    return PetCategories;
};