const { Op } = require("sequelize");
const Product = require("../models/Product");

const productController = {
    createProduct: async (req, res) => {
        const { name, price } = req.body;
        try {
            const newProduct = await Product.create({ name, price });
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(500).json({ message: "New product not created" });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ message: "Error getting products" });
        }
    },

    getProductsByName: async (req, res) => {
        const { name } = req.params;
        try {
            const products = await Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`,
                    },
                },
            });
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ message: "Product with the name does not exist" });
        }
    },

    getProductsByPrice: async (req, res) => {
        const { price } = req.params;
        try {
            const products = await Product.findAll({
                where: {
                    price: {
                        [Op.like]: `%${price}%`,
                    },
                },
            });
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ message: "Products with the price do not exist" });
        }
    },

    getProductById: async (req, res) => {
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
    },

    updateProduct: async (req, res) => {
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
                res.status(500).json({ message: "Error updating" });
            }
        },

        deleteProduct: async (req, res) => {
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
                res.status(500).json({ message: "Error deleting" });
            }
        },
    };

    module.exports = productController;