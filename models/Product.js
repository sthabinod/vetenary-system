// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const Product = sequelize.define("Product", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Product.associate = (models) => {
        Product.hasMany(models.Order, {
            onDelete: "cascade",
        });
    };
   

    return Product;
};