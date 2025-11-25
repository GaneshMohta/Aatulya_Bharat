import axios from 'axios';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import {oauth2Client} from '../utils/oauth2client.js';
import catchAsync from '../utils/catchAsync.js';
import User from '../model/authSchema.js';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';


dotenv.config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'postmessage';

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const allowedOrigins = [
  'http://localhost:5173',
  'https://aatulya-bharat.onrender.com',
  process.env.FRONTEND_URL,
];

// Sign JWT Token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIMEOUT,
  });
};

// Create and Send Token
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN),
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  };

  user.password = undefined;
  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    message: 'success',
    token,
    data: {
      user,
    },
  });
};

// Google OAuth Handler
export const signAuth = catchAsync(async (req, res) => {
  console.log("hii")
  const { code } = req.body;
console.log(code)
  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  // Exchange authorization code for tokens
  const { tokens } = await client.getToken(code);

  // Verify the ID token
  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: CLIENT_ID,
  });

  const payload = ticket.getPayload();

  // Find or create user
  let user = await User.findOne({ email: payload.email });

  if (!user) {
    user = await User.create({
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
    });

    user.save();
  }

  createSendToken(user, 200, res);
});

/* GET Google Authentication API. */
export const googleAuth = catchAsync(async (req, res, next) => {
  const code = req.query;
  console.log('USER CREDENTIAL -> ', code);

  const googleRes = await oauth2Client.oauth2Client.getToken(code);

  oauth2Client.oauth2Client.setCredentials(googleRes.tokens);

  const userRes = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
  );

  let user = await User.findOne({ email: userRes.data.email });

  if (!user) {
    console.log('New User found');
    user = await User.create({
      name: userRes.data.name,
      email: userRes.data.email,
      image: userRes.data.picture,
    });
  }

  createSendToken(user, 201, res);
});


export const getGoogleLogin = catchAsync(async (req,res,next)=>{
  const email = req.query;
  try {
  const user_details = await User.findOne({email:email});
    res.status(200).json({user_details});
  }
  catch (e){
    res.status(500).json({message:e});
  }
})
