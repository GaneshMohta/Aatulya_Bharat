import React from 'react';
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import './front.css';

export default function Temple() {
  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between p-2 bg-slate-300">
        <div className="flex gap-2">
          <Link to="/">
            <span className="text-slate-950 relative top-1">
              <BsArrowLeftShort />
            </span>
          </Link>
          <h3>Aatulya Bharat</h3>
        </div>
      </div>

      <div className="temple-container">
        <div className="hero-section flex items-center justify-around">
          <div className="temple-img-container flex items-center justify-center">
            <img
              src="https://images.news18.com/ibnlive/uploads/2023/09/news18-bl-zb-2023-09-5016e93136bb383e152a7a5eae9ee05e-16x9.jpg"
              className="temple-image"
              alt="Temple"
            />
          </div>
          <div className="temple-description">
            <h1 className="temple-title">Spiritual Adobe Of World</h1>
            <p className="temple-text">
              As someone passionate about history, TemplesIndia.com has become my go-to source for exploring the architectural wonders of India. The detailed insights into the historical context of each temple, along with practical travel tips, have made my temple visits not just spiritually uplifting but also intellectually fulfilling. A fantastic resource for both the devout and the curious explorer.
            </p>
          </div>
        </div>
        <div className="image-section flex justify-around mt-8 flex-wrap">
          <div className='image-card'>
            <img
              className='temp-cards'
              src='https://lh5.googleusercontent.com/proxy/Ipfc4eLmNV2qlWPF8r2yc7LbSkLpChRBUhFCORTThFaAXaKeerJ-W93u0ye35hIEi8A83PK2jfx3wJK9k6aoRtIDJ4n3ys0eynVl2dkpNFrkyVrZfRC-zx4PVzcUvmOxHxis42A3zYUAoQ'
              alt="Temple 1"
            />
            <div className="tcards-hov">
              <h2>Murdeshwara</h2>
            </div>
          </div>

          <div className='image-card'>
            <img
              className='temp-cards'
              src='https://lh5.googleusercontent.com/proxy/Ipfc4eLmNV2qlWPF8r2yc7LbSkLpChRBUhFCORTThFaAXaKeerJ-W93u0ye35hIEi8A83PK2jfx3wJK9k6aoRtIDJ4n3ys0eynVl2dkpNFrkyVrZfRC-zx4PVzcUvmOxHxis42A3zYUAoQ'
              alt="Temple 1"
            />
            <div className="tcards-hov">
              <h2>Murdeshwara</h2>
            </div>
          </div>

          <div className='image-card'>
            <img
              className='temp-cards'
              src='https://www.trinityairtravel.com/bblog/7980_second.jpg'
              alt="Temple 2"
            />
            <div className="tcards-hov">
              <h2>Somanath</h2>
            </div>
          </div>

          <div className='image-card'>
            <img
              className='temp-cards'
              src='https://www.bontravelindia.com/wp-content/uploads/2023/07/Popular-Temples-to-Visit-in-India-1000x565.jpg'
              alt="Temple 3"
            />
            <div className="tcards-hov">
              <h2>Srirangam</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
