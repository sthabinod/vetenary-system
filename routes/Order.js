const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { validateToken } = require("../middleware/AuthMiddleware");
const { Product, Customer, Order } = require("../models");

router.route("/").get(validateToken, async (req, res) => {
  let showOrder = await Order.findAll();
  res.json({
    status: "SUCCESS",
    message: "Order fetched successfully",
    data: showOrder,
  });
});

router.route("/userorder").get(validateToken, async (req, res) => {
  const userId = req.user.id;
  const customerObject = await Customer.findOne({ where: { UserId: userId } });

  const orderObject = await Order.findAll({
    where: { CustomerId: customerObject.id },
  });

  if (!orderObject) {
    res.json({ error: "Not found" });
  } else if (orderObject) {
    res.json(orderObject);
  }
});

router.route("/add_order").post(validateToken, async (req, res) => {
  // using sequelize to post data
  // accessing data
  // body has data in json
  const order = req.body;
  console.log(order);
  const userId = req.user.id;
  const customerObject = await Customer.findOne({ where: { UserId: userId } });
  const orderObject = Order.create({
    quantity: order.quantity,
    ProductId: order.ProductId,
    CustomerId: customerObject.id,
  });
  console.log(orderObject);
  res.json({
    success: "Order created successfully",
    data: order,
  });
});

module.exports = router;
