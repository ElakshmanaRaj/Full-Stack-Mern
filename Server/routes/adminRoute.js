
const express = require("express");
const { registerAdmin, loginAdmin, getAdminProfile, count } = require("../controllers/adminController");
const { adminAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", adminAuth, getAdminProfile);
router.get("/summary", adminAuth, count);


module.exports = router;