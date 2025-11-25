import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://aatulya-bharat.onrender.com';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');


    if (token) {
      console.log('✅ Token received:', token);

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch user data
      fetchUserData(token);
    } else if (error) {
      console.error('❌ Authentication error:', error);
      alert('Authentication failed. Please try again.');
      navigate('/signup');
    } else {
      console.error('❌ No token or error in URL');
      navigate('/signup');
    }
  }, [searchParams, navigate]);

  const fetchUserData = async (token) => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/v1/current`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('👤 User data:', res.data);
      localStorage.setItem('Bharat_user', JSON.stringify(res.data));

      // Redirect to home page
      navigate('/');
    } catch (err) {
      console.error('❌ Failed to fetch user:', err);
      localStorage.removeItem('token');
      navigate('/signup');
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='text-center'>
        <h2 className='text-2xl font-semibold mb-4'>Authenticating...</h2>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto'></div>
      </div>
    </div>
  );
}
