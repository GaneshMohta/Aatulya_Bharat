import express from "express";
import {createProducts} from "../controller/productController.js"
import { getProducts } from "../controller/productController.js";
import multer from "multer";
const router = express.Router();
import {v2 as cloudinary } from "cloudinary";


const app = express();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}


app.post('/uploads', upload.single('image'), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json({ imageUrl: cldRes.secure_url }); // <- Send Cloudinary image URL
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});


router.post("/create",createProducts);
router.get("/get",getProducts);

export default router;
