// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const Rating = sequelize.define("Rating", {
        rating: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Rating;
};