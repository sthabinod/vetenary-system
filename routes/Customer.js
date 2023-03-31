const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { Customer,User } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/get-customer-by-user-id").get(validateToken,async(req,res)=>{
    const userId = req.user.id
    const userObject = await User.findOne({ where: { id: userId } });
    customerObject = await Customer.findOne({ where: { UserId:userObject.id } });
    res.json(customerObject);
});

// async and await waiting for the data to be inserting and doing other things
router.route("/").post(validateToken,async(req,res)=>{
    // using sequelize to post data
    // accessing data
    // body has data in json
    const customer = req.body;
    console.log(customer);
    await Customer.create({"fullName":customer.fullName,"address":customer.address,"phone_number":customer.phone_number,"PetId":customer.PetId,"UserId":customer.UserId});
    res.json(customer);
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
    await Pet.update(detail, { where: { id: detail.id } })
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