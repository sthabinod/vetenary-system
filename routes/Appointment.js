const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { Appointment,Customer,Doctor } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");



router.route("/customer").get(validateToken,async(req,res)=>{
    const userId = req.user.id
    const customerObject = await Customer.findOne({ where: { UserId: userId } });
    showAppiontment = await Appointment.findAll({ where: { CustomerId: customerObject.id }});
    console.log(showAppiontment,"kld")
    if (!showAppiontment)
    {
        res.json({"error":"Not found"});
    }
    else if (showAppiontment)
    {
        res.json(showAppiontment);
    }
});

router.route("/doctor").get(validateToken,async(req,res)=>{
    const userId = req.user.id
    const doctorObject = await Doctor.findOne({ where: { UserId: userId } });
    showAppiontment = await Appointment.findAll({ where: { DoctorId: doctorObject.id }});
    if (!showAppiontment)
    {
        res.json({"error":"Not found"});
    }
    else if (showAppiontment)
    {
        res.json(showAppiontment);
    }
});



// async and await waiting for the data to be inserting and doing other things
router.route("/").post(validateToken,async(req,res)=>{
    // using sequelize to post data
    // accessing data
    // body has data in json
    const userId = req.user.id
    const customerObject = await Customer.findOne({ where: { UserId: userId } });
    const appointment_date = new Date();
    const appointment = req.body;
    Appointment.create({"DoctorId":appointment.DoctorId,"VaccinationId":appointment.VaccinationId,"CustomerId":customerObject.id,"appointment_date":appointment_date});
    res.json({data:appointment,"CustomerId":customerObject.id,message:"Appointment added"});
});

module.exports = router;