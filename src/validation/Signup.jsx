import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import './sign.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Signin from './Signin';

const API_URL = 'https://aatulya-bharat.onrender.com';
// const API_URL = 'http://localhost:3000';

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [error, setError] = useState("");

 const handleGoogleSuccess = async (tokenResponse) => {
   setLoading(true);
   setError("");

   try {
     console.log('🔑 Google access token received');

     // Send access token to backend
     const res = await axios.post(`${API_URL}/api/auth/v1/google`, {
       access_token: tokenResponse.access_token
     });

     console.log('✅ Backend response:', res.data);

     localStorage.setItem('token', res.data.token);
     localStorage.setItem('Bharat_email', JSON.stringify(res.data.user.email));
     axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

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
     redirect_uri: 'postmessage'
   });

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password
    };

    try {
      const res = await axios.post(
        `${API_URL}/user/sign-up`,
        payload
      );

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('Bharat_email',res.data.email);


      console.log('Signup successful:', res.data);
      navigate('/');
    } catch (e) {
      console.error('Signup failed:', e.response?.data || e.message);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div>
      <div className='signin-main'>
        <div className='sign-f1'>
          <div><h1>Bharat</h1></div>
          <p>Sign up for Best Experience</p>

          <button
            className='sgn_btn flex justify-center w-[100%] text-base items-center gap-2'
            onClick={()=>handleGoogleLogin()}
            disabled={loading} // Add disabled state
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <p>
            <span className='or'>________</span> or <span className='or'>________</span>
          </p>

          <button className='text-xs'>Continue with mail</button>

          <hr className='w-11/12 text-center relative translate-x-2 text-stone-900 bg-slate-950'/>

          {/* EMAIL/PASSWORD FORM */}
          <div className='flex justify-center'>
            <form className='flex flex-col gap-3 w-80 rounded-md items-center' onSubmit={handleLogin}>
              <input
                className='w-[32vh] p-1 ms-2 rounded-md text-sm'
                type='email'
                name='email'
                id='email'
                placeholder='ganesh@gmail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                required
              />
              <button
                type='submit'
                className='bg-blue-500 w-[15vh] ms-5 text-xs rounded-lg p-1 hover:bg-blue-600'
              >
                Sign Up
              </button>
            </form>
          </div>

          <p className='link'>
            Already have an Account?
            <Link to='/signin' className='text-blue-400 hover:text-blue-700'> Login</Link>
          </p>
        </div>

        <div className='sign-f2'>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR-9llGNNZGv9wB4UKWCcdiXxxroFI48Le0g&s'
            width='100%'
            alt='Signup illustration'
          />
        </div>
      </div>
    </div>
  );
}
