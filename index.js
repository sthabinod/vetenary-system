const express = require("express");
const app = express();
// to directly parse the post request as JSON format
app.use(express.json());
const cors = require("cors");

const db = require("./models");

app.use(cors());

// Routers
const customerRouter = require("./routes/Customer");
app.use("/customer", customerRouter);

const vaccinationRouter = require("./routes/Vaccination");
app.use("/vaccination", vaccinationRouter);

const petRouter = require("./routes/Pet");
app.use("/pet", petRouter);

const petCatRouter = require("./routes/PetCategory");
app.use("/pet-cat", petCatRouter);

const productRouter = require("./routes/Product");
app.use("/product", productRouter);

const appointmentRouter = require("./routes/Appointment");
app.use("/appointment", appointmentRouter);

const notificationRouter = require("./routes/Notification");
app.use("/notification", notificationRouter);

const doctorRouter = require("./routes/Doctor");
app.use("/doctor", doctorRouter);

const employeeRouter = require("./routes/Employee");
app.use("/employee", employeeRouter);

// const feedbackRouter = require("./routes/Pet");
// app.use("/feedback", feedbackRouter);

const companyRouter = require("./routes/Company");
app.use("/company", companyRouter);

const orderRouter = require("./routes/Order");
app.use("/order", orderRouter);

const userRouter = require("./routes/User");
app.use("/users", userRouter);


// const paypal = require('paypal-rest-sdk');
// paypal.configure({
//   'mode': 'sandbox', //sandbox or live
//   'client_id': '####yourclientid######',
//   'client_secret': '####yourclientsecret#####'
// });
// app.get('/payment', (req, res) => res.sendFile(__dirname + "/index.html"));


db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("RUNNING");
  });
});
