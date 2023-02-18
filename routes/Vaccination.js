const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { Vaccination } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(validateToken,async(req,res)=>{
    const showVaccination = await Vaccination.findAll();
    res.json(showVaccination);
});

// async and await waiting for the data to be inserting and doing other things
router.route("/").post((req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const vaccination = req.body;
    console.log(vaccination);
    Vaccination.create(vaccination);
    res.json(vaccination);
});

module.exports = router;