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


// Error handling for undefined routes
// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
// });

// chatbot
// app.post('/webhook', async (req, res) => {
//   const intent = req.body.queryResult.intent.displayName;
//   const parameters = req.body.queryResult.parameters;

//   if (intent === 'AskLocation') {
//       const location = parameters.location;
//       await Wedding.create({ location });
//       res.json({ fulfillmentText: `Location "${location}" has been noted!` });
//   } else if (intent === 'AskBudget') {
//       const budget = parameters.amount;
//       await Wedding.create({ budget });
//       res.json({ fulfillmentText: `Budget of "${budget}" has been noted!` });
//   }
//    else if (intent === 'AskTheme') {
//       const theme = parameters.theme;
//       await Wedding.create({ theme });
//       res.json({ fulfillmentText: `Theme "${theme}" has been noted!` });
//   }
// });
import { SessionsClient } from '@google-cloud/dialogflow';

const projectConfig = {
  projectId: {
      projectId: 'merabharat-97f8a',
      keyFilename: process.env.WEDDING_KEY_PATH,
  },
  travelId: {
      projectId: 'merabharat-ge9f',
      keyFilename: process.env.TRAVEL_KEY_PATH,
  },
  HeritageId: {
      projectId: 'heritage-ddhf',
      keyFilename: process.env.HERITAGE_KEY_PATH,
  },
};


app.post('/api/chat', async (req, res) => {
  //console.log(req);
  const { userMessage, context } = req.query;

  if (!userMessage || !context) {
    console.log(userMessage);
      return res.status(400).json({ error: 'Missing userMessage or context in the request.' });
  }

  const config = projectConfig[context];
  if (!config) {
      return res.status(400).json({ error: 'Invalid context provided.' });
  }
 // console.log(config)
  const { projectId, keyFilename } = config;
  const sessionClient = new SessionsClient({ keyFilename });
  const sessionId = uuidv4();

  try {
      const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
      console.log("Session Path:", sessionPath);

      const request = {
          session: sessionPath,
          queryInput: {
              text: {
                  text: userMessage,
                  languageCode: 'en',
              },
          },
      };

      console.log("Request Object:", request);

      const [response] = await sessionClient.detectIntent(request);

      if (!response || !response.queryResult) {
          console.error("No queryResult in Dialogflow response:", response);
          return res.status(500).json({ error: "Unexpected response from Dialogflow." });
      }

      const fulfillmentText = response.queryResult.fulfillmentText || "Sorry, I couldn't understand that.";
      console.log("Response from Dialogflow:", fulfillmentText);

      res.json({ botResponse: fulfillmentText });
  } catch (error) {
      console.error("Error communicating with Dialogflow:", error.message);
      res.status(500).json({ error: "Error communicating with Dialogflow." });
  }
});

app.listen(3000, () => {
  console.log('Server is running on https://aatulya-bharat.onrender.com');
});
