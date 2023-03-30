const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { PetCategories } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(validateToken, async (req, res) => {
  await PetCategories.findAll()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

// async and await waiting for the data to be inserting and doing other things
router.route("/").post(async (req, res) => {
  // using sequelize to post data
  // accessing data
  // body has data in json
  const categories = req.body;
  await PetCategories.create(categories)
    .then(() => {
      res.json({
        status: "SUCCESS",
        message: "Pet category added successfully",
      });
    })
    .catch((err) => {
      res.json({ error: err });
    });
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
  const petDetail = req.body;
  await PetCategories.update(petDetail, { where: { id: petDetail.id } })
    .then(() => {
      res.json({
        status: "SUCCESS",
        message: "Pet category updated successfully",
      });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.route("/delete/:id").delete(validateToken, async (req, res) => {
  let id = req.params.id;
  await PetCategories.destroy({ where: { id: id } })
    .then(() => {
      res.json({
        status: "SUCCESS",
        message: "Pet category deleted successfully",
      });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

module.exports = router;
