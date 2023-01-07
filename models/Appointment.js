// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const Appointment = sequelize.define("Appointment", {
        appointment_date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    });

  
    return Appointment;
};