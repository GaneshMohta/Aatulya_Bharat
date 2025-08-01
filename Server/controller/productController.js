import Product from '../model/productSchema.js';
import { v4 as uuidv4 } from 'uuid';

export const createProducts = async (req, res) => {
  try {
    const { productName, description, price, selectedcategory, quantity } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const image = req.body.image;

    const product = new Product({
      id: uuidv4(),
      productName,
      description,
      selectedcategory,
      price,
      quantity,
      image
    });

    console.log(product);
    await product.save();
    res.status(200).json("Product created successfully");
  } catch (e) {
    res.status(400).json(e);
    console.log(e);
  }
};


export const getProducts = async (req, res)=>{
  try{
  const products = await Product.find();
  res.status(200).json({products});
  }
  catch(e){
    res.status(404).json({message:"No data found"});
  }
}
