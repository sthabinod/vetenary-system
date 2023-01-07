const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { Feedback } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(async(req, res) => {
    showFeedback = await Feedback.findAll();
    res.json(showFeedback);
});

router.route("/").post((req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const feedback = req.body;
    Feedback.create(Feedback);
    res.json(feedback);
});

module.exports = router;