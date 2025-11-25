import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../model/authSchema.js';

const Router = express.Router();


Router.get('/getGoogleLogin',async(req,res,next)=>{
  const {g_email} = req.query;
  try {
  const user_details = await User.find({email:g_email});
    res.status(200).json({user_details});
  }
  catch (e){
    res.status(500).json({message:e});
  }
});


// @route   GET /api/auth/v1/google
// @desc    Initiate Google OAuth
Router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// @route   GET /api/auth/v1/google/callback
// @desc    Google OAuth callback
Router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`,
    session: false
  }),
  (req, res) => {
    try {
      console.log('✅ OAuth callback successful');
      console.log('👤 User:', req.user);

      if (!req.user) {
        console.error('❌ No user in request');
        // return res.redirect(`${process.env.FRONTEND_URL}/login?error=no_user`);
      }
      // Generate JWT token

      const token = jwt.sign(
        {
          id: req.user._id,
          email: req.user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      console.log('🎫 Token generated');

      res.cookie("bharat_token",token,{
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.cookie("bharat_email",req.user.email,{
        httpOnly: false,
        secure: true,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.redirect(`${process.env.FRONTEND_URL}/auth/callback`);
    } catch (err) {
      console.error('❌ Callback error:', err);
      // res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
    }
  }
);

// @route   GET /api/auth/v1/current
// @desc    Get current user
Router.get('/current', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-googleId');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/v1/logout
// @desc    Logout user
Router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

export default Router;
