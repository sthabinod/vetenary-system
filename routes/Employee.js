const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { Employee, User } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router
  .route("/get-employee-by-user-id")
  .get(validateToken, async (req, res) => {
    const userId = req.user.id;
    const userObject = await User.findOne({ where: { id: userId } });
    const employeeObject = await Employee.findOne({
      where: { UserId: userObject.id },
    });
    res.json(employeeObject);
  });

// async and await waiting for the data to be inserting and doing other things
router.route("/").post(validateToken, async (req, res) => {
  // using sequelize to post data
  // accessing data
  // body has data in json
  const employee = req.body;
  await Employee.create({
    fullName: employee.fullName,
    address: employee.address,
    phone_number: employee.phone_number,
    qualification: employee.qualification,
    UserId: employee.UserId,
  });
  res.json(employee);
});

module.exports = router;