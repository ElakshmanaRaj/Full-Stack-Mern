
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Product = require("../models/Product");
const Order = require("../models/Order");




const registerAdmin = async (req, res) => {
    try {
        const {name, email, password, adminInvite} = req.body;
        if(!name || !email ||!password || !adminInvite){
            return res.status(400).json({message:"Please fill all fields"});
        }

        let role = ""

        if(adminInvite && adminInvite === process.env.ADMIN_INVITE){
            role = "admin"
        } else{
            return res.status(400).json({message:"You are not allowed for admin role"});
        }

        const emailExists = await Admin.findOne({email});
        if(emailExists){
            return res.status(400).json({message:"Email already exists, Enter new Email"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            adminInvite,
            role:"admin"
        });

        res.status(201).json({
            success: true,
            admin:{
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}


const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"Please fill both email and password"});
        }

        const admin = await Admin.findOne({email});

        if(!admin){
            return res.status(404).json({message:"Email not found, Please enter submitted email"});
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Password Creditinals"});
        }

        const token = jwt.sign(
            {id: admin._id, email: admin.email, role: admin.role}, process.env.JWT_SECRET, {expiresIn:"7d"}
        );

        res.status(200).json({
            success:"Login Successfully",
            token,
            admin:{
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select("-password");
        if(!admin){
            res.status(404).json({message:"Admin not found"});
        }
        res.json({admin});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const count = async (req, res) => {
    try {
        const productCounts = await Product.countDocuments();
        const orderCounts = await Order.countDocuments();
        const totalStock = await Product.aggregate([
            { $group: { _id: null, stockCount:{ $sum: "$stock"}}}
        ]);
        const stockCounts = totalStock[0]?.stockCount || 0;
        res.json({productCounts, orderCounts, stockCounts });
    } catch (err) {
        res.status(500).json({ message: "Failed to count products and orders" });
    }
}

module.exports = { registerAdmin, loginAdmin, getAdminProfile, count };

