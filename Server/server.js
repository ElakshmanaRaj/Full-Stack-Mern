
const express  = require("express");
const cors  = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
dotenv.config();
const authRoutes = require("./routes/authRoute");
const adminRoutes = require("./routes/adminRoute");
const categoryRoutes = require("./routes/categoryRoute");
const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoute");
const path = require("path");


const app = express();

// middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/products", express.static(path.join(__dirname, "products")));

// cors handler
app.use(cors());

// DB Connection
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);


const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server started at: http://localhost:${port}`);
});




