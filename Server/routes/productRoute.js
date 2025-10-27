
const express = require("express");
const multer = require("multer");
const { adminAuth } = require("../middleware/authMiddleware");
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");
const { productUpload } = require("../middleware/uploadmiddleware");


const router = express.Router();
router.post("/", adminAuth, (req, res, next) => {
    productUpload.array("images", 5)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      } else if (err) {
        return res.status(400).json({ message: err.message });
      }
      createProduct(req, res);
    });
  });  
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", adminAuth, updateProduct);
router.delete("/:id", adminAuth, deleteProduct);

module.exports = router;