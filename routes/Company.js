const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { Company } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(async (req, res) => {
  showCompany = await Company.findOne({ where: { id: 1 } });
  res.json(showCompany);
});

router.route("/update").put(validateToken, async (req, res) => {
  // async and await waiting for the data to be inserting and doing other things

  // using sequelize to post data
  // accessing data
  // body has data in json
  const comp = req.body;
  await Company.update(comp, { where: { id: 1 } })
    .then(() => {
      res.json({
        status: "SUCCESS",
        message: "Company Details updated successfully",
      });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

module.exports = router;
