const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { User, Company,Product,Doctor,Appointment,Order,Contact,Customer } = require("../models");
const bcrypt = require("bcrypt");
// generate token using sign
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/", async (req, res) => {
  showUser = await User.findAll();
  res.json(showUser);
});

router.route("/login_user").post(async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  const user = await User.findOne({ where: { username: username } });
  if (!user) {
    res.json({ error: "User not found" });
    return;
  }

  if (password != user.password) {
    res.json({ error: "No correct password" });
    return;
  }

  // json web token is going to hash the username and id
  // third parameter is secret word to protect token
  const accessToken = sign(
    {
      username: user.username,
      id: user.id,
      user_type: user.user_type,
      email: user.email,
      password: user.password,
    },
    "important"
  );

  // after getting this accessToken it is stored in sessionStorage and use as part of header when request is made
  res.json(accessToken);
});

router.route("/").post(async (req, res) => {
  const user = req.body;
  const checkUser = await User.findOne({ where: { username: user.username } });

  if (user.email !== "" && user.password !== "" && user.username !== "") {
    if (!checkUser) {
      const userObject = await User.create(user);
      console.log(userObject);
      res.json({
        user: user,
        id: userObject.id,
        success: "User created successfully....",
      });
    } else {
      res.json({ error: "User already found" });
    }
  } else {
    res.json({ error: "Empty Fields" });
  }
});


router.route("/contact").get(validateToken, async (req, res) => {
    const userId = req.user.id
    showContact =  await Contact.findAll({
        where: {
          UserId:userId,
        },
      });
    res.json(showContact);
});

router.route("/dashboard").get(validateToken, async (req, res) => {
    count_user =  await User.count();
    count_doctor =  await Doctor.count();
    count_appointment =  await Appointment.count();
    count_product =  await Product.count();
    count_order =  await Order.count();

    res.json({"user":count_user,"doctor":count_doctor,"appointment":count_appointment,"product":count_appointment,"product":count_product,"order":count_order});
});


router.route("/user-dashboard").get(validateToken, async (req, res) => {
  user = req.user.id
  customer =  await Customer.findOne({ where: { UserId: user } });
  my_appointment =  await Appointment.count({where:{CustomerId:customer.id}});
  count_product =  await Product.count();
  my_order =  await Order.count({where:{CustomerId:customer.id}});

  res.json({"my_appointment":my_appointment,"product":count_product,"my_order":my_order});
});


router.route("/contact").post(validateToken, async (req, res) => {
    const contact = req.body;
    const userId = req.user.id

    if (contact.email !== "" && contact.name !== "" && contact.address !== "" && contact.phone_number !== "") {
            const contactObject = await Contact.create({email:contact.email,phone_number:contact.phone_number,address:contact.address,full_name:contact.full_name,UserId:userId});
            res.json({
                contact:contact,
                success: "Contact created successfully....",
            });
            
    } else {
        res.json({ error: "Empty Fields" });
    }
    
    
});


// async and await waiting for the data to be inserting and doing other things
router.route("/update").put(validateToken, async (req, res) => {
  const user = req.body;
  await User.update(user, { where: { id: user.id } })
    .then((response) => {
      res.json({
        status: "SUCCESS",
        message: "User updated successfully",
        data: response,
      });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.route("/auth").get(validateToken, (req, res) => {
  // using sequelize to post data
  // accessing data
  // body has data in json
  const userId = req.user;
  console.log(userId);
  res.json(userId);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await User.findByPk(id)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.route("/profile").get(validateToken, (req, res) => {
  // using sequelize to post data
  // accessing data
  // body has data in json
  // const user = User.findOne({ where: { username: req.user.username } });
  const userId = req.user;
  // let profile;
  const id = userId.id;
  const profile = Company.findOne({ where: { UserId: id } });
  res.json(profile);
});

router.route("/delete/:id").delete(validateToken, (req, res) => {
  let id = req.params.id;
  User.destroy({ where: { id: id } }).then(() => {
    res.json({
      status: "SUCCESS",
      message: "User deleted successfully",
    });
  });
});

module.exports = router;
