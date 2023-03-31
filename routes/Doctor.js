const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { Doctor, User } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(validateToken, async (req, res) => {
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

router.route("/get-doctor-by-user-id").get(validateToken, async (req, res) => {
  const userId = req.user.id;
  const userObject = await User.findOne({ where: { id: userId } });
  await Doctor.findOne({
    where: { UserId: userObject.id },
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

module.exports = router;
