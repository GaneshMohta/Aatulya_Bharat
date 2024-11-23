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

// Import routes
import userRouter from './Routes/userRoutes.js';
import blogRouter from './Routes/blogRoutes.js';
import productRouter from './Routes/productRoutes.js';
import paymentRouter from './Routes/paymentRoutes.js';
import authRouter from './Routes/authRoutes.js';
import Wedding from './model/weddingSchema.js';

// Get file and directory names for static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File upload route
app.post('/uploads', upload.single('image'), (req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1/MeraBharat')
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


// Error handling for undefined routes
// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
// });

// chatbot
app.post('/webhook', async (req, res) => {
  const intent = req.body.queryResult.intent.displayName;
  const parameters = req.body.queryResult.parameters;

  if (intent === 'AskLocation') {
      const location = parameters.location;
      await WeddingDetails.create({ location });
      res.json({ fulfillmentText: `Location "${location}" has been noted!` });
  } else if (intent === 'AskBudget') {
      const budget = parameters.amount;
      await Wedding.create({ budget });
      res.json({ fulfillmentText: `Budget of "${budget}" has been noted!` });
  }
   else if (intent === 'AskTheme') {
      const theme = parameters.theme;
      await Wedding.create({ theme });
      res.json({ fulfillmentText: `Theme "${theme}" has been noted!` });
  }
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
