import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import passport from './config/passport.js';

// Import routers
import userRouter from './Routes/userRoutes.js';
import blogRouter from './Routes/blogRoutes.js';
import productRouter from './Routes/productRoutes.js';
import paymentRouter from './Routes/paymentRoutes.js';
import authRouter from './Routes/authRoutes.js';

// Get file and directory names for static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy (important for Render/Heroku deployments)
app.set('trust proxy', 1);

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Adjust based on your needs
}));

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.FRONTEND_URL,
    ].filter(Boolean); // Remove undefined values

    // Allow requests with no origin (mobile apps, Postman, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Important for cookies and auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));

// Body Parser Middleware
app.use(express.json({ limit: '10mb' })); // Reduced from 100mb for security
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Cookie Parser (must come before session)
app.use(cookieParser());

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    }
  })
);

// Security Middleware
app.use(xss()); // Prevent XSS attacks
app.use(mongoSanitize()); // Prevent MongoDB injection

// Passport Initialization (after session middleware)
app.use(passport.initialize());
app.use(passport.session());

// Request Logging Middleware (helpful for debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Payload size error handler
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      message: 'Payload too large. Please reduce the size of the file or content.',
    });
  }
  next(err);
});

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI, {
      // These options are set by default in Mongoose 6+, but explicit for clarity
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Connect to database
connectDB();

// MongoDB connection event listeners
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to MeraBharat API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/v1',
      users: '/user',
      blogs: '/blog',
      products: '/product',
      payments: '/pay',
    }
  });
});

// API Routes
app.use('/api/auth/v1', authRouter);
app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/product', productRouter);
app.use('/pay', paymentRouter);

// 404 Handler - Must come after all routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
  });
});

// Global Error Handler - Must be last middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);

  // Don't expose error details in production
  const errorResponse = {
    success: false,
    message: err.message || 'Internal server error',
  };

  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  res.status(err.status || 500).json(errorResponse);
});

// Start Server
app.listen(3000, () => {
  console.log(`🚀 Server is running on port 3000`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Local: http://localhost:3000`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`🔗 Production: https://aatulya-bharat.onrender.com`);
  }
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('⚠️ SIGTERM received, closing server gracefully...');
  mongoose.connection.close(false, () => {
    console.log('✅ MongoDB connection closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('⚠️ SIGINT received, closing server gracefully...');
  mongoose.connection.close(false, () => {
    console.log('✅ MongoDB connection closed');
    process.exit(0);
  });
});

export default app;






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
