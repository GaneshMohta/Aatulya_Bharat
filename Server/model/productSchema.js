import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    id:String,
    productName:String,
    description:String,
    price:Number,
    selectedCategories:[],
    quantity:Number,
    image:String,
    rating:{
        rate:Number
    }
})

const Product = new mongoose.model('Products',productSchema)

export default Product;
