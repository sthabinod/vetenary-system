const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { Pet } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(async(req, res) => {
    pet = await Pet.findAll();
    res.json(pet);
}); 

router.route("/").post((req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const pet = req.body;
    Pet.create(pet);
    res.json(pet);
});

module.exports = router;