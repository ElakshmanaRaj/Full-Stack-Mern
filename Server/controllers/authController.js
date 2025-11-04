
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utilis/sendEmail");
const cloudinary = require("cloudinary").v2;


const JWT = process.env.JWT_SECRET

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
};


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        
        // inputs validate
        if(!name || !email || !password){
            return res.status(400).json({message:"Please fill all fields"});
        }

        let profileImage = req.body.profileImage || null; 

        if (req.file) {
            
            const result = await cloudinary.uploader.upload(req.file.path, {
              folder: "uploads", 
            });
          
            profileImage = result.secure_url; 
          }

        // check if email exists
        const emailExists = await User.findOne({email});

        if(emailExists){
           return res.status(401).json({message:"Email already exists, Enter new email"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOtp();

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImage,
            otp,
            otpExpiries: Date.now() + 15 * 60 * 1000
        });

          // Send OTP email
           const subject = "Verify Your Email - OTP Verification";
           const html = `
           <div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 10px; background: #f8f9fa;">
           <h2 style="color: #333;">Hi ${user.name},</h2>
           <p>Thank you for registering. Please use the following OTP to verify your email:</p>
           <h3 style="color: #007bff;">${otp}</h3>
           <p>This OTP will expire in <b>15 minutes</b>.</p>
           <p style="margin-top: 20px;">Best regards,<br><b>ShopNest Ecommerce</b></p>
           </div>`;

           await sendMail(user.email, subject, html);

        res.status(201).json({
            success: true,
            id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            message:"Please check your email for verify OTP after Login"
        });
        
    } catch (err) {
        res.status(500).json({message: err.message});
        
    }
} 

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body
    try {

        if(!email || !otp){
            return res.status(400).json({message:"Please fill both email and otp"});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"Email not found, Enter submiited the email"});
        }

        if(user.isVerified){
            return res.json({message:"Already Verified"});
        }

        if(user.otp !== otp || Date.now > user.otpExpiries){
            return res.status(400).json({message:"Invalid or Expired OTP"});
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiries = null;
        await user.save();

        res.status(200).json({message:"Email verified successfully. You can now login"});

        
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password){
            return res.status(400).json({message:"Please fill both email and password"});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"Email not found, Please fill submitted email"});
        }

        if(!user.isVerified){
            return res.status(400).json({message:"Please verify your email"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid Password"});
        }

        const token = jwt.sign(
            {id: user._id}, JWT, {expiresIn:"12h"}
        );

        res.status(200).json({
            success: "Login Successfully",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
        
    } catch (err) {
        res.status(500).json({message: err.message});
    }
} 

const resendOtp = async(req, res)=>{
    const { email } = req.body;
    try {
        if(!email){
            return res.status(400).json({message:"Please enter email"});
        }

        const user = await User.findOne({email});
        
        if (!user) {
            return res.status(404).json({ message: "Email not found, Please fill submitted email" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "Email is already verified" });
        }

        // OTP generate
        const otp = generateOtp();

        user.otp = otp;
        user.otpExpiries = Date.now() + 15 * 60 * 1000;
        await user.save();

        // Send new OTP
        await sendMail(
            user.email,
            "Resend OTP - Email Verification",
            `Your new OTP is ${otp}. It will expire in 15 minutes.`
        );

        res.status(200).json({
            success: true,
            message: "New OTP sent to your email"
        });
        
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}


const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        
        if(!email){
            res.status(400).json({message:"Please enter email"});
        }

        const user = await User.findOne({email});

        if(!user){
            res.status(404).json({message:"Email not found"});
        }

        const otp = generateOtp();
        user.otp = otp;
        user.otpExpiries = Date.now() + 15 * 60 * 1000;
        await user.save();

        await sendMail(
            user.email,
            "Password Reset OTP",
            `Your 6 digits OTP code for reset password is ${otp}. It will expire in 15 minutes`
        );

        res.status(200).json({success: true, message:"OTP sent to your email for password reset"});
        
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const verifyResetOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {

        if(!email || !otp){
            return res.status(400).json({message:"Please enter both email and otp"});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"Email not found, Please enter submitted email"});
        }

        if(user.otp !== otp || Date.now() > user.otpExpiries){
            res.status(403).json({message:"Invalid or Expired OTP"});
        }

        res.status(200).json({ success: true, message:"OTP verified successfully. Now reset your password"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const resetPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message:"Please fill both email and new password"});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"Email not found, Please enter submitted email"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.otp = null;
        user.otpExpiries = null;
        await user.save();

        res.status(200).json({success: true, message:"Reset Password successfully, You can now login with new password"})
        
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            res.status(404).json({message:"User not found"});
        }
        res.json({user});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}


module.exports = { registerUser, loginUser, verifyOtp, resendOtp, getUserProfile, forgotPassword, verifyResetOTP, resetPassword };