const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { Customer } = require("../models");

router.get("/", async(req, res) => {
    showCustomer = await Customer.findAll();
    res.json(showCustomer);
});

// async and await waiting for the data to be inserting and doing other things
router.route("/").post((req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const customer = req.body;
    Customer.create(customer);
    res.json(customer);
});

module.exports = router;