const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrder = async (req, res) => {
  try {
    const { products } = req.body;
    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No Products in order" });
    }

    const userId = req.user.id;
    let orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found ${item.product}` });
      }

      if (product.stock < item.qty) {
        return res
          .status(400)
          .json({ message: `${product.name} has insufficient stock` });
      }

      product.stock -= item.qty;
      await product.save();

      orderProducts.push({
        product: product._id,
        qty: item.qty,
        price: product.price,
      });
    }

    const totalAmount = orderProducts.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    const order = await Order.create({
      user: userId,
      products: orderProducts.map((p) => ({
        product: p.product,
        qty: p.qty,
      })),
      totalAmount,
    });

    const orderDetails = await Order.findById(order._id).populate("products.product", "name price").populate("user", "name");
    res.status(201).json({ success: true, orderDetails });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price");
    res.json({orders});
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email").populate("products.product", "name price");
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        res.json(order);
        
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if(!order){
      return res.status(404).json({message:"Order not found"});
    }
    res.json({message:"Order delted successfully"});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({user: req.user._id}).populate("products.product", "name price image").sort({createdAt: -1});
    res.status(200).json({success: true, orders});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}

module.exports = { createOrder, getOrders, getOrderById, deleteOrder, getUserOrders };
