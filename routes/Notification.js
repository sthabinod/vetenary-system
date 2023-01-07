const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { validateToken } = require("../middleware/AuthMiddleware");
const { Notification, Customer, Product } = require("../models");

router.route("/").get(validateToken, async(req, res) => {
    // const id = req.user.id;
    // const CustomerObject = await Customer.findOne({ where: { UserId: id } });
    // const customerId = CustomerObject.id;
    // const showNotification = await Notification.findAll({
    //     where: { CustomerId: customerId },
    // });
    // res.json(showNotification);
});

module.exports = router;