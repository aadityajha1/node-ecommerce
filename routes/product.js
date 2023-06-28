const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");
const checkRole = require("../middlewares/role");
const productController = require("../controllers/productController");

router.use(isAuthenticated, checkRole(["admin", "seller"]));

router.post("/all", productController.createProduct);
router.get("/all", productController.getAllProducts);
router.get("/all/:name", productController.getProductsByName);
router.get("/all/:price", productController.getProductsByPrice);
router.get("/all/:id", productController.getProductById);
router.put("/all/:id", productController.updateProduct);
router.delete("/all/:id", productController.deleteProduct);

module.exports = router;
