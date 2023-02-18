const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { Doctor } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(validateToken,async(req,res)=>{
    showDoctor = await Doctor.findAll();
    res.json(showDoctor);
});

router.route("/").post((req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const doctor = req.body;
    Doctor.create(doctor);
    res.json(doctor);
});

module.exports = router;