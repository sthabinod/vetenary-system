const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { validateToken } = require("../middleware/AuthMiddleware");
const { Product, Customer, Order } = require("../models");

router.get("/:id", async(req, res) => {
    const id = req.params.id;
    getRelatedOrder = await Order.findAll({ where: { UserId: id } });
    res.json(getRelatedOrder);
});

router.route("/").post(async(req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const order = req.body;
    console.log(order);
    const customer = await Customer.findOne({
        where: { UserId: order.userId },
    });

    if (!customer) {
        res.json({
            error: "You have to update information before submitting order.",
        });
    } else if (customer) {
        const orderToAdd = Order.create({
            orderNumber: order.orderNumber,
            ProductId: order.ProductId,
            UserId: order.userId,
        });
        res.json({ success: "Wait for confirmation." });
    }
});

module.exports = router;