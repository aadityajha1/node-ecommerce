const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");
const checkRole = require("../middlewares/role");
const Product = require("../models/Product");  // using the Product model

router.use(isAuthenticated, checkRole(["admin", "seller"]));

// create a new product
router.post("/all", async (req, res) => {
  const { name, price } = req.body;
  try {
    const newProduct = await Product.create({name, price});
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "New product not created" });
  }
});

// get all products
router.get("/all", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error getting products" });
  }
});

// get products by name
routsa.get("/all/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        }
      }
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Product with the name doesnot exist" });
  }
});

// get products by price
router.get("/all/:price", async (req, res) => {
  const { price } = req.params;
  try {
    const products = await Product.findAll({
      where: {
        price: {
          [Op.like]: `%${price}%`,
        }
      }
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Products  withe the price doesnot exist" });
  }
});

// get products by id
router.get("/all/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

// update a product
router.put("/all/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      product.name = name;
      product.price = price;
      await product.save();
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating " });
  }
});

// delete a product
router.delete("/all/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      await product.destroy();
      res.status(204).json({ message: "Product deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting " });
  }
});

module.exports = router;
