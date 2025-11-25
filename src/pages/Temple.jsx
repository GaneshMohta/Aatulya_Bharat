import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../components/bot/config';
import MessageParser from '../components/bot/MessageParser';
import ActionProviderHeritage from '../components/bot/ActionProviderHeritage';
import Chatbot from "react-chatbot-kit";


export default function Temple() {
  const [visible, setVisible] = useState(false);

  const Isvisible = () => {
    setVisible((prev) => !prev);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50">
      <div className="relative overflow-hidden">

        {/* Header Content */}
        <div className="relative z-10 flex justify-between items-center p-6 bg-gradient-to-r from-rose-700 to-orange-300">
          <div className="flex gap-4 items-center">
            <button className="text-white hover:text-yellow-200 transition-all duration-300 text-xl hover:scale-110 transform">

            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                  <Link to='/' className='text-white'>←</Link>
              </div>
              <h3 className="text-white font-bold text-2xl tracking-wide drop-shadow-lg">
                <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                  Aatulya Bharat
                </span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 ">
            <div className="flex items-center gap-2">
              <div className="text-yellow-200 font-bold text-2xl opacity-80">ॐ</div>
              <div className="flex flex-col gap-1">
                <div className="w-3 h-3 bg-yellow-300 rounded-full opacity-70 animate-pulse"></div>
                <div className="w-2 h-2 bg-orange-300 rounded-full opacity-60 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-1 h-1 bg-rose-300 rounded-full opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Spiritual Quote Banner */}
        <div className="relative z-10 text-center pb-4 pt-2 ">
          <p className="text-rose-900 text-m font-medium italic opacity-90 animate-pulse ">
            "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः" - May all be happy, may all be healthy
          </p>
        </div>
      </div>

      <div className="temple-container p-6">
        <div className="hero-section flex items-center justify-around flex-wrap gap-8 mt-8">
          <div className="temple-img-container flex items-center justify-center">
            <div className="relative group">
              <img
                src="https://images.news18.com/ibnlive/uploads/2023/09/news18-bl-zb-2023-09-5016e93136bb383e152a7a5eae9ee05e-16x9.jpg"
                className="w-96 h-64 object-cover rounded-2xl shadow-2xl ring-4 ring-orange-200 ring-opacity-50 group-hover:ring-opacity-80 transition-all duration-300"
                alt="Temple"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent rounded-2xl"></div>
              <div className="absolute top-4 right-4 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full p-2">
                {/* <Sun className="text-white" size={20} /> */}
              </div>
            </div>
          </div>
          <div className="temple-description max-w-md">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-700 to-orange-600 bg-clip-text text-transparent mb-6">
              Spiritual Adobe Of World
            </h1>
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-rose-500 to-orange-500 rounded-full"></div>
              <p className="text-gray-700 leading-relaxed pl-4 font-medium">
                As someone passionate about history, TemplesIndia.com has become my go-to source for exploring the architectural wonders of India. The detailed insights into the historical context of each temple, along with practical travel tips, have made my temple visits not just spiritually uplifting but also intellectually fulfilling. A fantastic resource for both the devout and the curious explorer.
              </p>
            </div>
          </div>
        </div>

        <div className="image-section flex justify-around mt-16 flex-wrap gap-8">
          <div className="image-card relative group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                className="w-80 h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                src="https://lh5.googleusercontent.com/proxy/Ipfc4eLmNV2qlWPF8r2yc7LbSkLpChRBUhFCORTThFaAXaKeerJ-W93u0ye35hIEi8A83PK2jfx3wJK9k6aoRtIDJ4n3ys0eynVl2dkpNFrkyVrZfRC-zx4PVzcUvmOxHxis42A3zYUAoQ"
                alt="Temple 1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-orange-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-white font-bold text-xl mb-2">Murdeshwara</h2>
                  <div className="flex items-center gap-2">
                    {/* <Sun className="text-yellow-300" size={16} /> */}
                    <span className="text-yellow-200 text-sm">Divine Blessing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="image-card relative group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                className="w-80 h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                src="https://www.trinityairtravel.com/bblog/7980_second.jpg"
                alt="Temple 2"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-orange-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-white font-bold text-xl mb-2">Somanath</h2>
                  <div className="flex items-center gap-2">
                    {/* <Star className="text-yellow-300" size={16} /> */}
                    <span className="text-yellow-200 text-sm">Sacred Journey</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="image-card relative group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                className="w-80 h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                src="https://www.bontravelindia.com/wp-content/uploads/2023/07/Popular-Temples-to-Visit-in-India-1000x565.jpg"
                alt="Temple 3"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-orange-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-white font-bold text-xl mb-2">Srirangam</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-200 text-sm">Eternal Peace</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={Isvisible}
        className="fixed bottom-10 right-6 bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 hover:from-rose-700 hover:via-orange-600 hover:to-amber-600 z-10 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 transform ring-4 ring-orange-200 ring-opacity-50 hover:ring-opacity-100"
      >
        {/* <MessageCircle size={36} color="white" /> */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
      </button>

      {visible && (
        <div className="fixed bottom-2 right-2 bg-white ring-4 ring-orange-200 ring-opacity-50">
          {/* <div className="w-80 h-96 border border-orange-200 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-50 to-rose-50"> */}
            {/* <div className="text-center"> */}
              {/* <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProviderHeritage}
              /> */}
              <iframe width="350" height="430" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/dd401814-1040-4a82-8f33-2ae9e1cfc35d"></iframe>
              {/* <p className="text-gray-600 font-medium">Spiritual Guide Chatbot</p>
              <p className="text-gray-500 text-sm mt-2">Here to help your divine journey</p> */}
            {/* </div> */}
          {/* </div> */}
        </div>
      )}
    </div>
  );
}
