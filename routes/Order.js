const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const nodemailer = require("nodemailer");
const { Product, Customer, Order } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

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

router.route("/").get(validateToken, async (req, res) => {
  let showOrder = await Order.findAll();
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
  const order = req.body;
  const userId = req.user.id;
  await Customer.findOne({ where: { UserId: userId } })
    .then((respo) => {
      Order.create({
        quantity: order.quantity,
        ProductId: order.ProductId,
        CustomerId: respo.id,
      })
        .then(() => {
          User.findByPk(userId)
            .then((resp) => {
              transporter
                .sendMail({
                  from: "sikaai30000@gmail.com",
                  to: resp.email,
                  subject: `Order Created`,
                  html: `<p>Your order has been placed successfully. Please visit company website for more details.</p><p>Regards,<br /><b>Veterinary</b><br />Ithari-04, Sunsari</p>`,
                })
                .then(() => {
                  console.log("Your email send");
                })
                .catch((err) => {
                  console.log("Valid email is required");
                });

              res.json({
                success: "Order created successfully",
                data: order,
              });
            })
            .catch((err) => {
              res.json({ error: err });
            });
        })
        .catch((err) => {
          res.json({ error: err });
        });
    })
    .catch((err) => {
      res.json({ error: err });
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
