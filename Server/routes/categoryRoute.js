
const express = require("express");
const { createCategory, getCategory, updateCategory, delteCategory, getCategoryById } = require("../controllers/categoryController");
const { adminAuth } = require("../middleware/authMiddleware");


const router = express.Router();
router.post("/", adminAuth, createCategory);
router.get("/", getCategory);
router.get("/:id", getCategoryById);
router.put("/:id", adminAuth, updateCategory);
router.delete("/:id", adminAuth, delteCategory);

module.exports = router;