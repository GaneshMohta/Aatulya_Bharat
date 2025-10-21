import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import multer from 'multer';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import { v4 as uuidv4 } from 'uuid';
// Import routes
import userRouter from './Routes/userRoutes.js';
import blogRouter from './Routes/blogRoutes.js';
import productRouter from './Routes/productRoutes.js';
import paymentRouter from './Routes/paymentRoutes.js';
import authRouter from './Routes/authRoutes.js';
import Wedding from './model/weddingSchema.js';
import fs from 'fs'
// Get file and directory names for static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

import { v2 as cloudinary } from 'cloudinary';

// Middleware setup
dotenv.config();
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));

app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).send('Payload too large. Please reduce the size of the file or content.');
  }
  next(err);
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });
// async function handleUpload(file) {
//   const res = await cloudinary.uploader.upload(file, {
//     resource_type: "auto",
//   });
//   return res;
// }

// app.post('/uploads', upload.single('image'), async(req,res) => {
//   try {
//     const b64 = Buffer.from(req.file.buffer).toString("base64");
//     let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
//     const cldRes = await handleUpload(dataURI);
//     res.json(cldRes);
//   } catch (error) {
//     console.log(error);
//     res.send({
//       message: error.message,
//     });
//   }
// })

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File upload route
// app.post('/uploads', upload.single('image'), (req, res) => {
//   const imageUrl = `/uploads/${req.file.filename}`;
//   res.json({ imageUrl });
// });
// MongoDB Local Host connection
// mongoose.connect("mongodb://127.0.0.1:27017/MeraBharat")
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((e) => {
//     console.error('Error connecting to MongoDB:', e);
//   });

  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((e) => {
      console.error('Error connecting to MongoDB:', e);
    });
// Test route to verify server is working
app.get('/', (req, res) => {
  res.send('Hello, MeraBharat!');
});

// Use imported routes for API endpoints
app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/product', productRouter);
app.use('/pay', paymentRouter);
app.use('/api/v1/auth', authRouter);




app.listen(3000, () => {
  console.log('Server is running on https://aatulya-bharat.onrender.com');
});









//import  { SessionsClient } from '@google-cloud/dialogflow';

// const projectConfig = {
//   projectId: {
//     projectId: 'merabharat-97f8a',
//     credentials: JSON.parse(process.env.WEDDING_KEY),
//   },
//   travelId: {
//     travelId: 'merabharat-ge9f',
//     credentials: JSON.parse(process.env.TRAVEL_KEY),
//   },
//   HeritageId: {
//     travelId: 'heritage-ddhf',
//     credentials: JSON.parse(process.env.HERITAGE_KEY),
//   },
// };

// app.post('/api/chat', async (req, res) => {
//   const { userMessage, context } = req.query;

//   console.log("req   "+ userMessage+ " " + context);

//   if (!userMessage || !context) {
//     return res.status(400).json({ error: 'Missing userMessage or context in the request.' });
//   }

//   const config = projectConfig[context];
//   if (!config) {
//     return res.status(400).json({ error: 'Invalid context provided.' });
//   }

//   const { projectId, credentials } = config;
//   const sessionClient = new SessionsClient({ credentials });
//   const sessionId = uuidv4();

//   try {
//     const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
//     const request = {
//       session: sessionPath,
//       queryInput: {
//         text: {
//           text: userMessage,
//           languageCode: 'en',
//         },
//       },
//     };

//     const [response] = await sessionClient.detectIntent(request);
//     if (!response || !response.queryResult) {
//       return res.status(500).json({ error: "Unexpected response from Dialogflow." });
//     }

//     const fulfillmentText = response.queryResult.fulfillmentText || "Sorry, I couldn't understand that.";
//     res.json({ botResponse: fulfillmentText });
//   } catch (error) {
//     console.error("Error communicating with Dialogflow:", error);
//     res.status(500).json({ error: "Error communicating with Dialogflow." });
//   }
// });
