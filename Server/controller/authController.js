import axios from 'axios';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import {oauth2Client} from '../utils/oauth2client.js';
import catchAsync from '../utils/catchAsync.js';
import User from '../model/userSchema.js';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
dotenv.config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:5173";

const client = new OAuth2Client(CLIENT_ID , CLIENT_SECRET ,REDIRECT_URI);

export const signAuth =async(req,res)=>{

  try{
    const {code} = req.body;

    const {tokens} = await client.getToken(code);

    const userInfoResponse = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });

      const userInfo = userInfoResponse.data;

      res.status(200).json({user:userInfo});

  }
  catch (e){
    console.error("Error during Google login:", e.message);
    res.status(500).json({ error: "Authentication failed" });
  }
}

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIMEOUT,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  console.log(process.env.JWT_COOKIE_EXPIRES_IN);
  const cookieOptions = {
    expires: new Date(Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN),
    httpOnly: true,
    path: '/',
    secure: false,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
    cookieOptions.sameSite = 'none';
  }

  user.password = undefined;

  res.cookie('jwt', token, cookieOptions);

  console.log(user);

  res.status(statusCode).json({
    message: 'success',
    token,
    data: {
      user,
    },
  });
};

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
