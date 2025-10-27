
const express = require("express");
const multer = require("multer");
const { registerUser, loginUser, verifyOtp, resendOtp, getUserProfile, forgotPassword, verifyResetOTP, resetPassword } = require("../controllers/authController");
const { upload } = require('../middleware/uploadmiddleware');
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", (req, res, next)=>{
    upload.single("profileImage")(req, res, (err)=>{
        if(err instanceof multer.MulterError){
            return res.status(400).json({message: err.message});
        } else if(err){
            return res.status(400).json({message: err.message});
        }
        registerUser(req, res);
    });
});

router.post("/login", loginUser);
router.post("/verify", verifyOtp);
router.post("/resend", resendOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-otp", verifyResetOTP);
router.post("/reset-password", resetPassword);
router.get("/profile", protect, getUserProfile);

module.exports = router;