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

const medicalStaffRouter = require("./routes/MedicalStaff");
app.use("/medical-staff", medicalStaffRouter);

const categoryRouter = require("./routes/Categories");
app.use("/category", categoryRouter);

const mStaffCatRouter = require("./routes/MedicalStaffCategory");
app.use("/m-staff-cat", mStaffCatRouter);

const productRouter = require("./routes/Product");
app.use("/product", productRouter);

const notificationRouter = require("./routes/Notification");
app.use("/notification", notificationRouter);

const educationRouter = require("./routes/Education");
app.use("/education", educationRouter);

const feedbackRouter = require("./routes/Feedback");
app.use("/feedback", feedbackRouter);

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
        companyName: "Medic",
        softwareBrothers: false,
    },
});

const router = AdminBroExpress.buildRouter(adminBro);

app.use(adminBro.options.rootPath, router);
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("RUNNING");
    });
});