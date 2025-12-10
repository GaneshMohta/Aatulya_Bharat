import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../model/authSchema.js';

const Router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
}

// Helper function to generate token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Helper function to send auth response
const sendAuthResponse = (res, user, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      userRole: user.userRole
    }
  });
};

// @route   POST /api/auth/v1/google
// @desc    Authenticate with Google access token
Router.post('/google', async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({
        success: false,
        message: 'Access token is required'
      });
    }

    console.log('🔑 Google: Received access token. Fetching user info...');

    // Fetch user info from Google
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Google API error:', errorData);
      throw new Error('Failed to fetch user info from Google');
    }

    const googleUser = await response.json();
    console.log('👤 User info received:', googleUser.email);

    // Verify the user data is valid
    if (!googleUser.email || !googleUser.email_verified) {
      return res.status(401).json({
        success: false,
        message: 'Unable to verify Google account'
      });
    }

    // Find or create user
    let user = await User.findOne({ email: googleUser.email });

    if (user) {
      console.log('✅ Existing user found');

      // Update Google ID/avatar if necessary
      if (!user.googleId) {
        user.googleId = googleUser.sub;
        user.avatar = googleUser.picture;
        await user.save();
      }
    } else {
      console.log('🆕 Creating new user');

      user = await User.create({
        googleId: googleUser.sub,
        email: googleUser.email,
        name: googleUser.name,
        avatar: googleUser.picture,
        provider: 'google',
      });
    }

    // Generate JWT token
    const token = generateToken(user);
    console.log('✅ Authentication successful');

    // Send response
    sendAuthResponse(res, user, token);

  } catch (error) {
    console.error('❌ Google auth error:', error);

    res.status(500).json({
      success: false,
      message: 'Google authentication failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Authentication error'
    });
  }
});

// @route   POST /api/auth/v1/login
// @desc    Login with email and password
Router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: 'Please login with Google'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(user);
    sendAuthResponse(res, user, token);

  } catch (error) {
    console.error('❌ Login error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// @route   POST /api/auth/v1/register
// @desc    Register new user
Router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      provider: 'local'
    });

    const token = generateToken(user);
    sendAuthResponse(res, user, token);

  } catch (error) {
    console.error('❌ Registration error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// @route   GET /api/auth/v1/current
// @desc    Get current user
Router.get('/current', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -googleId -__v');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('❌ Get current user error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/auth/v1/logout
// @desc    Logout user
Router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

export default Router;
