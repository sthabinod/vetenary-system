const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: "sikaai30000@gmail.com",
      pass: "yidmeybwkhdwhowh",
  },
});

// testing success
transporter.verify((error, success) => {
  if (error) {
      console.log(error);
  } else {
      console.log("Ready for messages");
      console.log(success);
  }
});


const { validateToken } = require("../middleware/AuthMiddleware");
const { Product, Customer, Order } = require("../models");

router.route("/").get(validateToken, async (req, res) => {
  let showOrder = await Order.findAll();
  transporter
    .sendMail({
       from: 'sikaai30000@gmail.com',
        to: 'stha.binod1000@gmail.com',
                                                        subject: `New Event - `,
                                                        html: `<p></p><p>Regards,<br /><b>Career Technical Academy</b><br />Dharan-6, Panbari, Sunsari</p>`,
                                                    })
                                                    .then(() => {
                                                        console.log(
                                                            "Email sent successfully"
                                                        );
                                                    })
                                                    .catch((err) => {
                                                        console.log(
                                                            "Please enter valid email address."
                                                        );
                                                    });
  res.json({
    status: "SUCCESS",
    message: "Order fetched successfully",
    data: showOrder,
  });
});

router.route("/userorder").get(validateToken, async (req, res) => {
  const userId = req.user.id;
  const customerObject = await Customer.findOne({ where: { UserId: userId } });

  const orderObject = await Order.findAll({
    where: { CustomerId: customerObject.id },
  });

  if (!orderObject) {
    res.json({ error: "Not found" });
  } else if (orderObject) {
    res.json(orderObject);
  }
});

router.route("/add_order").post(validateToken, async (req, res) => {
  // using sequelize to post data
  // accessing data
  // body has data in json
  const order = req.body;
  console.log(order);
  const userId = req.user.id;
  const customerObject = await Customer.findOne({ where: { UserId: userId } });
  const orderObject = Order.create({
    quantity: order.quantity,
    ProductId: order.ProductId,
    CustomerId: customerObject.id,
  });
  console.log(orderObject);
  res.json({
    success: "Order created successfully",
    data: order,
  });
});




router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Order.findByPk(id)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.route("/update").put(validateToken, async (req, res) => {
  const orderDetail = req.body;
  await Order.update(petDetail, { where: { id: petDetail.id } })
    .then(() => {
      res.json({
        status: "SUCCESS",
        message: "Order updated successfully",
      });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});



router.route("/delete/:id").delete(validateToken, (req, res) => {
  let id = req.params.id;
  Order.destroy({ where: { id: id } }).then(() => {
    res.json({ status: "SUCCESS", message: "Order deleted successfully" });
  });
});
module.exports = router;
