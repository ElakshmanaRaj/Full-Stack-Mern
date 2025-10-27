
const express = require("express");
const { protect, adminAuth } = require("../middleware/authMiddleware");
const { createOrder, getOrders, getOrderById, deleteOrder, getUserOrders } = require("../controllers/orderController");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/user-orders", protect, getUserOrders);
router.get("/", adminAuth, getOrders);
router.get("/:id", adminAuth, getOrderById);
router.delete("/:id", adminAuth, deleteOrder);


module.exports = router;