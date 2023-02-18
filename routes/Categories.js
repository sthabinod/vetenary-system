const express = require('express');
const { sequelize } = require('../models');
const router = express.Router()
const { PetCategories } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");


router.route("/").get(validateToken,async(req,res)=>{
    showCategories = await PetCategories.findAll();
    res.json(showCategories);
});

// async and await waiting for the data to be inserting and doing other things 
router
    .route("/")
    .post((req, res) => {
        // using sequelize to post data
        // accessing data
        // body has data in json
        const categories = req.body;
        Categories.create(categories);
        res.json(categories);

    });

module.exports = router