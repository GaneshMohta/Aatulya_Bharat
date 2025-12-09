import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/nameslice';
import axios from 'axios';
import './sign.css';

const API_URL = 'https://aatulya-bharat.onrender.com';

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle Google Login Success
  const handleGoogleSuccess = async (codeResponse) => {
    setLoading(true);
    setError("");

    try {
      console.log('🔑 Google auth code received');

      // Send authorization code to backend
      const res = await axios.post(`${API_URL}/api/auth/v1/google`, {
        code: codeResponse.code
      });

      console.log('✅ Backend response:', res.data);

      // Store token and user data
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('Bharat_email', JSON.stringify(res.data.user));

      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

      // Update Redux store
      dispatch(setUser(res.data.user));

      // Navigate to home
      navigate('/');
    } catch (err) {
      console.error('❌ Google login failed:', err);
      setError(err.response?.data?.message || 'Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initialize Google Login
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: (error) => {
      console.error('❌ Google login error:', error);
      setError("Google login failed. Please try again.");
      setLoading(false);
    },
    flow: 'auth-code'
  });

  // Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_URL}/user/login`, {
        email,
        password
      });

      console.log('✅ Login successful:', res.data);

      // Store token and user data
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('Bharat_email', JSON.stringify(res.data.user));

      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

      // Update Redux store
      dispatch(setUser(res.data.user));

      // Navigate to home
      navigate('/');
    } catch (err) {
      console.error('❌ Login failed:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='signin-main'>
      <div className='sign-f1'>
        <div><h1>Bharat</h1></div>
        <p>Sign in for Best Experience</p>

        {/* Error Message */}
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'>
            {error}
          </div>
        )}

        {/* Google Login Button */}
        <button
          className='sgn_btn flex justify-center items-center gap-2 w-[100%] text-base'
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FcGoogle />
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>

        <p>
          <span className='or'>________</span> or <span className='or'>________</span>
        </p>

        <button className='text-xs'>Continue with email</button>

        <hr className='w-11/12 text-center relative translate-x-2 text-stone-900 bg-slate-950'/>

        {/* Email/Password Form */}
        <div className='flex justify-center'>
          <form
            className='flex flex-col gap-3 w-80 rounded-md items-center'
            onSubmit={handleLogin}
          >
            <input
              className='w-[32vh] p-1 ms-2 rounded-md text-sm'
              type='email'
              name='email'
              id='email'
              placeholder='ganesh@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />

            <input
              className='w-[32vh] p-1 ms-2 rounded-md'
              placeholder='Password'
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />

            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 w-[15vh] ms-5 text-xs rounded-lg p-1'
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        <p className='link'>
          Don't have an Account? <Link to='/signup' className='text-blue-400 hover:text-blue-700'>Register</Link>
        </p>
      </div>

      <div className='sign-f2'>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR-9llGNNZGv9wB4UKWCcdiXxxroFI48Le0g&s'
          alt='Bharat illustration'
          width='100%'
        />
      </div>
    </div>
  );
}
