import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';


import { FcGoogle } from "react-icons/fc";
import './sign.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/nameslice';

const API_URL = 'https://aatulya-bharat.onrender.com';


export default function Signin() {


  const [email,setEmail]= useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const handleChangeEmail=(e)=>{
    setEmail(e.target.value);
  }



  const handleGoogleLogin = () => {
    // Redirect to backend OAuth route
    window.location.href = `${API_URL}/api/auth/v1/google`;
  };

    const handleLogin = async (e) => {
      e.preventDefault();

      const payload = {
        email: email,
        password: password
      };

      try {
        const res = await axios.post(
          `${API_URL}/user/login`,
          payload
        );

        localStorage.setItem("token",res.data.token);
        localStorage.setItem("Bharat_email",res.data.email);

        console.log('Signup successful:', res.data);
        navigate('/');
      } catch (e) {
        console.error('Signup failed:', e.response?.data || e.message);
        alert('Signup failed. Please try again.');
      }
    };


  const handleChangePassword=(e)=>{
    setPassword(e.target.value);
  }

  // const handleLogin = async(e)=>{
  //   e.preventDefault();
  //   const payload={
  //     email:email,
  //     password:password
  //   }
  //   console.log(payload);

  //   try{
  //     const res= await axios.post("https://aatulya-bharat.onrender.com/user/login",payload);
  //     console.log(res)
  //     localStorage.setItem("token",res.data.token);
  //     localStorage.setItem("Bharat_email",res.data.email);
  //     navigate('/');
  //   }
  //   catch(e){
  //     console.log("not valid")
  //   }
  // }
  return (
    <div>

        <div className='signin-main'>
            <div className='sign-f1'>
             <div><h1>Bharat</h1></div>
             <p>Sign up for Best Experience</p>
             <button className='sgn_btn flex justify-center w-[100%] text-base' onClick={handleGoogleLogin} ><FcGoogle /></button>
             <p><span className='or'>________</span > or <span className='or'>________</span></p>
             <button className='text-xs'>Continue with mail</button>
             <hr className='w-11/12 text-center relative translate-x-2 text-stone-900 bg-slate-950'/>
             <div className='flex justify-center'>
             <form className='flex flex-col gap-3 w-80 rounded-md items-center'>
              <input className='w-[32vh] p-1 ms-2 rounded-md text-sm' type='mail'
               name='email' id='email' placeholder='Ganesh@gmail.com' onChange={handleChangeEmail}/>
              <input className='w-[32vh] p-1 ms-2 rounded-md' placeholder='....' type='password' name='password' id='password' onChange={handleChangePassword}/>
              <button type='submit' onClick={handleLogin} className='bg-blue-500 w-[15vh] ms-5 text-xs rounded-lg p-1'>Login</button>
             </form>
            </div>
            <p className='link'>Don't have an Account <Link to='/signup' element={<Signin />} className='text-blue-400 hover:text-blue-700'>Register</Link></p>
            </div>
            <div className='sign-f2'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR-9llGNNZGv9wB4UKWCcdiXxxroFI48Le0g&s' width={'100%'}/>
            </div>

        </div>

    </div>
  )
}
