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
    await Employee.findOne({
      where: { UserId: userObject.id },
    })
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.json({ error: err });
      });
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



router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Employee.findByPk(id)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.route("/update").put(validateToken, async (req, res) => {
  const employeeDetail = req.body;
  await Employee.update(employeeDetail, { where: { id: petDetail.id } })
    .then(() => {
      res.json({
        status: "SUCCESS",
        message: "Employee updated successfully",
      });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});



router.route("/delete/:id").delete(validateToken, (req, res) => {
  let id = req.params.id;
  Employee.destroy({ where: { id: id } }).then(() => {
    res.json({ status: "SUCCESS", message: "Employee deleted successfully" });
  });
});
module.exports = router;
