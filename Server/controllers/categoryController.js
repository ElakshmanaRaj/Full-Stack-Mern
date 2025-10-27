
const Category = require("../models/Category");


const createCategory = async (req, res) => {
    try {
        const {name} = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: "Category name is required" });
        }
        
        const categoryExists = await Category.findOne({name});

        if(categoryExists){
            return res.status(400).json({message:"This category already exists, Enter new category"});
        }
        const category = await Category.create({name});
        res.status(201).json({
            success: true,
            category
        });

    } catch (err) {
        res.status(500).json({message: err.message});
    }   
}

const getCategory = async (req, res) => {
    try {
        const category = await Category.find();
        res.json({success: true, category});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category){
            return res.status(404).json({message:"Category not found"});
        }
        res.json({success: true, category});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category){
            return res.status(404).json({message:"Category not found"});
        }

        category.name = req.body.name || category.name;
        await category.save();
        res.status(200).json({success: true, category});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const delteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category){
            return res.status(404).json({message:"Category not found"});
        }

        await category.deleteOne();
        res.json({message:"Category deleted successfully"});
        
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = {createCategory, getCategory, getCategoryById, updateCategory, delteCategory};