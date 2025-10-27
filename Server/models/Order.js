const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        qty: {
          type: Number,
          required: true
        }
      }
    ],
    totalAmount: {
      type: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
