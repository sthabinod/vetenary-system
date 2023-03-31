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


router.get("/:id", async (req, res) => {
    const id = req.params.id;
    await PetCategories.findByPk(id)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.json({ error: err });
      });
  });
  
  router.route("/update").put(validateToken, async (req, res) => {
    const petCat = req.body;
    await PetCategories.update(petCat, { where: { id: petCat.id } })
      .then(() => {
        res.json({
          status: "SUCCESS",
          message: "Pet Categories updated successfully",
        });
      })
      .catch((err) => {
        res.json({ error: err });
      });
  });
  
  
  
  router.route("/delete/:id").delete(validateToken, (req, res) => {
    let id = req.params.id;
    PetCategories.destroy({ where: { id: id } }).then(() => {
      res.json({ status: "SUCCESS", message: "Pet Categories deleted successfully" });
    });
  });
module.exports = router