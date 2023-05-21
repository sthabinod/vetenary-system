// for using in another files

module.exports = (sequelize, DataTypes) => {
  // // Table name as Blog in double quote and Blog as variable in front
  const Order = sequelize.define("Order", {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: false,
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Order;
};
