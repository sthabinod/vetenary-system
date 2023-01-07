const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { MedicalStaff } = require("../models");

router.get("/", async(req, res) => {
    showStaff = await MedicalStaff.findAll();
    res.json(showStaff);
});

// async and await waiting for the data to be inserting and doing other things
router.route("/").post((req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const staff = req.body;
    MedicalStaff.create(staff);
    res.json(staff);
});

module.exports = router;