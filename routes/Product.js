const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { Product } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { validateToken } = require("../middleware/AuthMiddleware");


router.route("/").get(validateToken,async(req,res)=>{
    showProduct = await Product.findAll();
    res.json({status:"SUCCESS" ,message: "Product fetched successfully",data:showProduct });
});

// async and await waiting for the data to be inserting and doing other things
router.route("/").post(validateToken,async(req,res)=>{
    // using sequelize to post data
    // accessing data
    // body has data in json
    const product = req.body;
    Product.create(product);
    res.json({status:"SUCCESS" ,message: "Product added successfully",data:product });
});

router.get("/:id", async(req, res) => {
    const id = req.params.id;
    getRelatedProduct = await Product.findByPk(id);
    res.json(getRelatedProduct);
});

router.get("/products", async(req, res) => {
    getLatestProducts = await Product.findAll({
        limit: 2,
        order: [
            ["id", "DESC"]
        ],
    });
    res.json(getLatestProducts);
});

router.post("/search", async(req, res) => {
    const product = req.body;
    showProduct = await Product.findAll({
        where: {
            title: {
                [Op.like]: `%${product.keyword}%`,
            },
        },
    });
    res.json(showProduct);
});

router.route("/update").get(validateToken, (req, res) => {
    // async and await waiting for the data to be inserting and doing other things
    
        // using sequelize to post data
        // accessing data
        // body has data in json
        const id = req.query['id'];
        console.log(id);
        const product = req.body;
        const updated = Product.update(product, { where: { id: id } });
        res.json({status:"SUCCESS" ,message: "Product udpated successfully",data:product });
    });


router.route("/delete").get(validateToken, (req, res) => {
            const id = req.query['id'];
            console.log(id);    
        
            const updated = Product.destroy({ where: { id: id } });
            res.json({status:"SUCCESS" ,message: "Vehicle Order deleted successfully" });
        });

module.exports = router;