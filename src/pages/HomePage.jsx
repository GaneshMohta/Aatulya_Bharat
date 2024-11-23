import React, { useState } from 'react'
import MB1 from '../components/states/image/mb3.jpg'
import NE from '../components/states/image/National-Emblem.jpg'
import { Link } from 'react-router-dom'
import './front.css'
import Bestofindia from './Bestofindia'
import BlogofIndia from '../compounds/BlogofIndia'
import './responsive.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CgProfile } from "react-icons/cg";


export default function HomePage() {

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  let u_name=localStorage.getItem('u_name');
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className='bg-slate-50'>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={5000}  // 5 seconds
        infinite={true}        // Loop through items infinitely
        arrows={false}         // Hide left and right arrows
        showDots={false}       // Hide navigation dots
      >
        <div className='relative h-auto bg-white hm-m1'>
          <img src="https://thesocialmediaexplorer.wordpress.com/wp-content/uploads/2015/09/3.jpg?w=1000" alt='hm-img' className='w-full'/>
          <div className="absolute top-1 flex justify-between w-full hm-h1">
            <div className='ms-2'></div>
            <div><h1>ATALTUYA BHARAT</h1></div>
            <div className='me-2 relative'>
              <CgProfile onClick={() => setDropdownVisible(!isDropdownVisible)} className='cursor-pointer'/>
              {isDropdownVisible && (
                <div className='absolute top-8 right-0 bg-white shadow-md rounded p-2'>
                  <p className='text-sm text-gray-700'>{u_name}</p>
                  <Link to="/profile" className='text-blue-500 hover:underline'>View Profile</Link>
                </div>
              )}
            </div></div>
          <div className='absolute top-[30vh] left-[0vh]'>
            <div className='w-[100vw] h-[30vh] flex items-center'>
              <h1 className='matemasie-regular typewriter '>INCREDIBLE INDIA</h1>
            </div>
          </div>
        </div>

        <div className='relative h-auto bg-white hm-m1'>
          <img src="https://static-blog.treebo.com/wp-content/uploads/2018/06/Uttar-Pradesh.jpg" alt='hm-img' className='w-full'/>
          <div className="absolute top-1 flex justify-between w-full hm-h1">
            <div className='ms-2'></div>
            <div><h1>ATALTUYA BHARAT</h1></div>
            <div className='me-2 relative'>
            <CgProfile onClick={() => setDropdownVisible(!isDropdownVisible)} className='cursor-pointer'/>
              {isDropdownVisible && (
                <div className='absolute top-8 right-0 bg-white shadow-md rounded p-2'>
                  <p className='text-sm text-gray-700'>{u_name}</p>
                  <Link to="/profile" className='text-blue-500 hover:underline'>View Profile</Link>
                </div>
              )}
            </div> </div>
          <div className='absolute top-[30vh] left-[10vh] backdrop-card'>
            <div className='w-[40vw] h-[30vh] backdrop-blur-1 bg-white/20 p-3 flex'>
              <div className='w-[60%]'>
                <h1 className='text-orange-700 font-bold'>The Incredible states of India</h1>
                <p className='text-white'>8 Beauties and 28 Wonders of India</p>
                <br />
                <Link to='Map'>
                <button className='bg-yellow-400 p-1 rounded-md w-20'>Explore</button>
                </Link>
              </div>
              <div className='bg-red-700 rounded-3xl h-32 w-36'>
                <img src='https://fairgaze.com/images/UploadedImages/thumbs/0309134_0309134_xasdiihbb.jpg' className='h-full rounded-3xl'/>
              </div>
            </div>
          </div>
        </div>

        <div className='relative h-auto bg-white hm-m1'>
          <img src="https://i.pinimg.com/736x/f4/c4/3c/f4c43cd02794709f565d65d40a83d66b.jpg" alt='hm-img' className='w-full'/>
          <div className="absolute top-1 flex justify-between w-full hm-h1">
            <div className='ms-2'></div>
            <div><h1>ATALTUYA BHARAT</h1></div>
            <div className='me-2 relative'>
              <CgProfile onClick={() => setDropdownVisible(!isDropdownVisible)} className='cursor-pointer'/>
              {isDropdownVisible && (
                <div className='absolute top-8 right-0 bg-white shadow-md rounded p-2'>
                  <p className='text-sm text-gray-700'>{u_name}</p>
                  <Link to="/profile" className='text-blue-500 hover:underline'>View Profile</Link>
                </div>
              )}
            </div></div>
          <div className='absolute top-[30vh] left-[10vh] backdrop-card'>
            <div className='w-[40vw] h-[30vh] backdrop-blur-1 bg-white/20 p-3 flex'>
              <div className='w-[60%]'>

                <h1 className='text-orange-700 font-bold'>Make in India</h1>
                <p className='text-white'>It is an India Product Zero Defect and Zero Effect</p>
                <br />
                <Link to='Make-in-India'>
                <button className='bg-yellow-400 p-1 rounded-md w-20'>Explore</button>
                </Link>
              </div>
              <div className='bg-red-700 rounded-3xl h-32 w-36'>
                <img src='https://b1088462.smushcdn.com/1088462/wp-content/uploads/2021/02/made_in_india_cctv.webp?lossy=2&strip=1&webp=1' className='h-full rounded-3xl'/>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
      <br />

      <div className='mb-12'>
        <Bestofindia />
      </div>
      <div>
      <div>
        <h1 className='text-center text-3xl font-serif font-black'>Blog</h1>
        <h2 className='text-center  text-pretty mib-h1 '>An insight to the incredible experience in India </h2>
        <div>
          <BlogofIndia />
        </div>
      </div>
      </div>
    </div>
  )
}
