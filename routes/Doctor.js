const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { Doctor } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(validateToken,async(req,res)=>{
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


router.get("/:id", async (req, res) => {
    const id = req.params.id;
    await Doctor.findByPk(id)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.json({ error: err });
      });
  });
  
  router.route("/update").put(validateToken, async (req, res) => {
    const doctorDetail = req.body;
    await Doctor.update(doctorDetail, { where: { id: doctorDetail.id } })
      .then(() => {
        res.json({
          status: "SUCCESS",
          message: "Doctor updated successfully",
        });
      })
      .catch((err) => {
        res.json({ error: err });
      });
  });
  
  
  
  router.route("/delete/:id").delete(validateToken, (req, res) => {
    let id = req.params.id;
    Doctor.destroy({ where: { id: id } }).then(() => {
      res.json({ status: "SUCCESS", message: "Doctor deleted successfully" });
    });
  });

module.exports = router;