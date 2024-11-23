import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import './sign.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Signin from './Signin';



export default function Signup() {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        console.log("Authorization Code:", authResult.code);

        // Send the authorization code to the backend
        const result = await axios.post("http://localhost:3000/api/v1/auth/google", {
          code: authResult.code,
        });

        // Handle the user data from the backend
        console.log(result.data.user)

        navigate("/");
      } else {
        console.error("Google Auth Failed:", authResult);
        throw new Error(authResult);
      }
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});


  const [email,setEmail]= useState("");
  const [password,setPassword] = useState("");

  const handleChangeEmail=(e)=>{
    setEmail(e.target.value);
  }

  const handleChangePassword=(e)=>{
    setPassword(e.target.value);
  }

  const handleLogin = async(e)=>{
    e.preventDefault();
    const payload={
      email:email,
      password:password
    }
    console.log(payload);

    try{
      const res= await axios.post("http://localhost:3000/user/sign-up",payload);
      navigate('/');
    }
    catch(e){
      console.log("not valid")
    }
  }
  return (
    <div>

        <div className='signin-main'>
            <div className='sign-f1'>
             <div><h1>Bharat</h1></div>
             <p>Sign up for Best Experience</p>
             <button className='sgn_btn flex justify-center w-[100%] text-base ' onClick={googleLogin}><FcGoogle /></button>
             <p><span className='or'>________</span > or <span className='or'>________</span></p>
             <button className='text-xs'>Continue with mail</button>
             <hr className='w-11/12 text-center relative translate-x-2 text-stone-900 bg-slate-950'/>
             <div className='flex justify-center'>
             <form className='flex flex-col gap-3 w-80 rounded-md items-center'>
              <input className='w-[32vh] p-1 ms-2 rounded-md text-sm' type='mail'
               name='email' id='email' placeholder='Ganesh@gmail.com' onChange={handleChangeEmail}/>
              <input className='w-[32vh] p-1 ms-2 rounded-md' placeholder='....' type='password' name='password' id='password' onChange={handleChangePassword}/>
              <button type='submit' onClick={handleLogin} className='bg-blue-500 w-[15vh] ms-5 text-xs rounded-lg p-1'>Sign Up</button>
             </form>
            </div>
            <p className='link'>Already have an Account <Link to='/signin' element={<Signin />} className='text-blue-400 hover:text-blue-700'>Login</Link></p>
            </div>
            <div className='sign-f2'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR-9llGNNZGv9wB4UKWCcdiXxxroFI48Le0g&s' width={'100%'}/>
            </div>

        </div>

    </div>
  )
}
