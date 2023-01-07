const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { Education } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(async(req, res) => {
    showEducation = await Education.findAll();
    res.json(showEducation);
});

router.route("/").post((req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const education = req.body;
    Education.create(education);
    res.json(education);
});

module.exports = router;