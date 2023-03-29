const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { User, Company } = require("../models");
const bcrypt = require("bcrypt");
// generate token using sign
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/", async(req, res) => {
    showUser = await User.findAll();
    res.json(showUser);
});

router.route("/login_user").post(async(req, res) => {
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
    const accessToken = sign({
            username: user.username,
            id: user.id,
            isCompany: user.isCompany,
            email: user.email,
            password: user.password,
        },
        "important"
    );

    // after getting this accessToken it is stored in sessionStorage and use as part of header when request is made
    res.json(accessToken);
});

router.route("/").post(async(req, res) => {
    const user = req.body;
    const checkUser = await User.findOne({ where: { username: user.username } });

    if (user.email !== "" && user.password !== "" && user.username !== "") {
        if (!checkUser) {
            const userObject = await User.create(user);
            console.log(userObject);
            res.json({
                user:user,
                id:userObject.id,
                success: "User created successfully....",
            });
            
        } else {
            res.json({ error: "User already found" });
        }

        
    } else {
        res.json({ error: "Empty Fields" });
    }
    
    
});




// async and await waiting for the data to be inserting and doing other things
router.route("/update").post(validateToken, async(req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const { password } = req.body;
    const updateUser = req.body;
    // const hash = user.password
    // User.create({
    //     username: user.username,
    //     password: hash
    // })
    // res.json(hash);
    const userId = req.user.id;
    const updated =await User.update(updateUser, { where: { id: userId } });
    if (updated){
        res.json({"data":updateUser,"success":"SUCCESS","message":"Updated successfully!"});

    }   
    else{
        res.json({"Failed":"NOT UPDATED","message":"Could not successfully!"});
    }
});

router.route("/auth").get(validateToken, (req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const userId = req.user;
    console.log(userId);
    res.json(userId);
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

module.exports = router;