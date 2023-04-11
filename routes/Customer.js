const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { Customer, User } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/", async (req, res) => {
  let showUser = await Customer.findAll();
  res.json(showUser);
});

router
  .route("/get-customer-by-user-id")
  .get(validateToken, async (req, res) => {
    const userId = req.user.id;
    const userObject = await User.findOne({ where: { id: userId } });
    customerObject = await Customer.findOne({
      where: { UserId: userObject.id },
    });
    res.json(customerObject);
  });

// async and await waiting for the data to be inserting and doing other things
router.route("/").post(async (req, res) => {
  // using sequelize to post data
  // accessing data
  // body has data in json
  const customer = req.body;
  await Customer.create(customer)
    .then(() => {
      res.json({
        status: "SUCCESS",
        message: "Customer added successfully",
      });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Customer.findByPk(id)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.route("/update").put(validateToken, async (req, res) => {
  const detail = req.body;
  await Customer.update(detail, { where: { id: detail.id } })
    .then(() => {
      res.json({
        status: "SUCCESS",
        message: "Customer updated successfully",
      });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.route("/delete/:id").delete(validateToken, (req, res) => {
  let id = req.params.id;
  Customer.destroy({ where: { id: id } }).then(() => {
    res.json({ status: "SUCCESS", message: "Customer deleted successfully" });
  });
});

module.exports = router;
