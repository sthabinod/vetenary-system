const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { Pet, Customer } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(async (req, res) => {
  let pet = await Pet.findAll();
  res.json(pet);
});

router.route("/userpet").get(validateToken, async (req, res) => {
  const userId = req.user.id;
  const customerObject = await Customer.findOne({ where: { UserId: userId } });

  const petObject = await Pet.findAll({
    where: { CustomerId: customerObject.id },
  });

  if (!petObject) {
    res.json({ error: "Not found" });
  } else if (petObject) {
    res.json(petObject);
  }
});

router.route("/").post((req, res) => {
  // using sequelize to post data
  // accessing data
  // body has data in json
  const pet = req.body;
  Pet.create(pet);
  res.json(pet);
});

router.route("/delete/:id").delete(validateToken, (req, res) => {
  let id = req.params.id;
  Pet.destroy({ where: { id: id } }).then(() => {
    res.json({ status: "SUCCESS", message: "Pet deleted successfully" });
  });
});

module.exports = router;
