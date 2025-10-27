
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String
        },
        description:{
            type: String
        },
        category:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        price:{
            type: Number
        },
        stock:{
            type: Number
        },
        images :[
            String
        ]

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);