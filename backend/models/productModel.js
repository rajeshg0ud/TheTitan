import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" // Ensure "User" matches the model name of your User schema
    },
    id:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    listedPrice: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        required: true
    } 
    
}, {
    timestamps: true  
});

const Product = mongoose.model("Product", productSchema);

export default Product;
