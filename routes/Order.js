const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { validateToken } = require("../middleware/AuthMiddleware");
const { Product, Customer, Order } = require("../models");

router.route("/:id").get(validateToken,async(req,res)=>{
    const id = req.params.id;
    const userId = req.user.id
    const customerObject = await Customer.findOne({ where: { UserId: userId } });
    getRelatedOrder = await Order.findAll({ where: { CustomerId: customerObject.id,id:id }});

    if (!getRelatedOrder)
    {
        res.json({"error":"Not found"});
    }
    else if (getRelatedOrder)
    {
        res.json(getRelatedOrder);
    }

});

router.route("/userorder").get(validateToken,async(req,res)=>{
    const userId = req.user.id
    const customerObject = await Customer.findOne({ where: { UserId: userId } });
    if (!getRelatedOrder)
    {
        res.json({"error":"Not found"});
    }
    else if (getRelatedOrder)
    {
        res.json(getRelatedOrder);
    }

});


router.route("/add_order").post(validateToken,async(req,res)=>{
    // using sequelize to post data
    // accessing data
    // body has data in json
    const order = req.body;
    console.log(order);
    const userId = req.user.id
    const customerObject = await Customer.findOne({ where: { UserId: userId } });
    const orderObject = Order.create({"quantity":order.quantity,"ProductId":order.ProductId,"CustomerId":customerObject.id});
    console.log(orderObject);
    res.json({
        success: "Order created successfully",data:order
    });

});

module.exports = router;