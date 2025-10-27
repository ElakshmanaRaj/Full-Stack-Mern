
const Product = require("../models/Product");

const createProduct = async (req, res) => {
    try {
      const { name, description, category, price, stock } = req.body;
  
      if (!name || !description || !category || !price || !stock) {
        return res.status(400).json({ message: "Please fill all fields" });
      }
  
      let imageUrls = [];
      if (req.files && req.files.length > 0) {
        imageUrls = req.files.map((file) =>
          `${req.protocol}://${req.get("host")}/products/${file.filename}`
        );
      }
  
      const product = await Product.create({
        name,
        description,
        category,
        price,
        stock,
        images: imageUrls,
      });
  
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
      });
    } catch (err) {
      console.error("Error creating product:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  };
  

const getProducts = async (req, res) => {
    try {
        const product = await Product.find().populate("category", "name");
        res.json(product);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category", "name");
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }

        res.json(product);
        
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const updateProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      product.name = req.body?.name ?? product.name;
      product.description = req.body?.description ?? product.description;
      product.category = req.body?.category ?? product.category;
      product.price = req.body?.price ?? product.price;
      product.stock = req.body?.stock ?? product.stock;


  
      await product.save();
      res.json({ success: true, product });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};
  

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        await product.deleteOne();
        res.json({message:"Product deleted successfully"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };