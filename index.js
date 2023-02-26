const express = require("express");
const app = express();
// to directly parse the post request as JSON format
app.use(express.json());
const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
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
app.use("/appointment",appointmentRouter);

const notificationRouter = require("./routes/Notification");
app.use("/notification", notificationRouter);

const doctorRouter = require("./routes/Doctor");
app.use("/doctor", doctorRouter);

// const feedbackRouter = require("./routes/Pet");
// app.use("/feedback", feedbackRouter);

const companyRouter = require("./routes/Company");
app.use("/company", companyRouter);

const orderRouter = require("./routes/Order");
app.use("/order", orderRouter);

const userRouter = require("./routes/User");
app.use("/users", userRouter);

const AdminBroSequelize = require("@admin-bro/sequelize");
AdminBro.registerAdapter(AdminBroSequelize);

const adminBro = new AdminBro({
    rootPath: "/admin",
    loginPath: "/admin/login",
    databases: [db],
    branding: {
        companyName: "Vetenary",
        softwareBrothers: true,
    },
});

const router = AdminBroExpress.buildRouter(adminBro);

app.use(adminBro.options.rootPath, router);
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("RUNNING");
    });
});