// for using in another files

module.exports = (sequelize, DataTypes) => {
  // // Table name as Blog in double quote and Blog as variable in front
  const Contact = sequelize.define("Contact", {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Contact;
};
