const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { Customer,User } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/get-customer-by-user-id").get(validateToken,async(req,res)=>{
    const userId = req.user.id
    const userObject = await User.findOne({ where: { id: userId } });
    customerObject = await Customer.findOne({ where: { UserId:userObject.id } });
    res.json(customerObject);
});

// async and await waiting for the data to be inserting and doing other things
router.route("/").post(validateToken,async(req,res)=>{
    // using sequelize to post data
    // accessing data
    // body has data in json
    const customer = req.body;
    console.log(customer);
    await Customer.create({"fullName":customer.fullName,"address":customer.address,"phone_number":customer.phone_number,"PetId":customer.PetId,"UserId":customer.UserId});
    res.json(customer);
});

module.exports = router;