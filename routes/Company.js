const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { Company } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(async(req, res) => {
    showCompany = await Company.findOne({ where: { id: 1 } });
    res.json(showCompany);
});

module.exports = router;