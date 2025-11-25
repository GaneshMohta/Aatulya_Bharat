import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdventurePage() {
  const [visible, setVisible] = useState(false);

  const isVisible = () => {
    setVisible((prev) => !prev);
  }

  const attractions = [
    { id: 1, name: 'College Trips', description: 'Make memorable to your Journey', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU1gARMF4qrJHK2_Xde2m8rE1fHV2JJA7mlQ&s' },
    { id: 2, name: 'Islands, Andaman-Nicobar', description: 'Island is Filled with Attractive adventure', imgSrc: 'https://htoindia.com/wp-content/uploads/2019/06/Andaman-Nicobar-Island.jpg' },
    { id: 3, name: 'Hawa Mahal, Jaipur', description: 'Pink City', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIy16C95WyISHMYiweGNYba4p2f5kdZD_heQ&s' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-700 via-rose-50 to-amber-50">
      {/* Enhanced Spiritual Header */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}


        {/* Header Content */}
        <div className="relative z-10 flex justify-between items-center p-6 bg-gradient-to-r from-rose-800 to-orange-300">
          <div className="flex gap-4 items-center">
            <button className="text-white hover:text-yellow-200 transition-all duration-300 text-xl hover:scale-110 transform">
              <Link to='/' className="text-2xl">←</Link>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">⛰️</span>
              </div>
              <h3 className="text-white font-bold text-2xl tracking-wide drop-shadow-lg">
                <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                  Aatulya Bharat
                </span>
              </h3>
            </div>
          </div>

          {/* Adventure Elements */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-yellow-200 text-2xl animate-spin" style={{animationDuration: '8s'}}>🧭</div>
              <div className="flex flex-col gap-1">
                <div className="w-3 h-3 bg-yellow-300 rounded-full opacity-70 animate-pulse"></div>
                <div className="w-2 h-2 bg-orange-300 rounded-full opacity-60 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-1 h-1 bg-rose-300 rounded-full opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Adventure Quote Banner */}
        <div className="relative z-10 text-center pb-4  bg-gradient-to-r from-rose-800 to-orange-300">
          <p className="text-yellow-100 text-sm font-medium italic opacity-90 animate-pulse">
            "Adventure awaits those who dare to explore the incredible beauty of India"
          </p>
        </div>
      </div>

      {/* Enhanced Logo Header */}
      <div className="relative bg-gradient-to-r from-orange-100 to-rose-100 shadow-lg">
        <div className="flex justify-center py-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-orange-400 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvZjGuKX2pqDKgyMm3MBj-QKPYSCR0f5V56w&s"
              alt="Adventure Logo"
              className="relative h-20 w-auto rounded-full shadow-xl ring-4 ring-orange-200 ring-opacity-50 group-hover:ring-opacity-100 transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Enhanced Attractions Section */}
      <div className="attractions-container px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-rose-700 to-orange-600 bg-clip-text text-transparent mb-4">
            Top Tourist Attractions In India
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-orange-500 text-xl">⭐</span>
            <p className="text-xl text-gray-700 font-medium">Explore the best tourist destinations in India</p>
            <span className="text-rose-500 text-xl">⭐</span>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {attractions.map((attraction, index) => (
            <div key={attraction.id} className="group relative">
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={attraction.imgSrc}
                    alt={attraction.name}
                    className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm">📸</span>
                  </div>

                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm">📍</span>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="relative p-6 bg-white">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : 'bg-pink-500'}`}></div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-rose-600 transition-colors duration-300">
                      {attraction.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
                    {attraction.description}
                  </p>

                  {/* Action Section */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-rose-500 text-lg">❤️</span>
                      <span className="text-sm text-gray-500">Add to favorites</span>
                    </div>

                    <button className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-rose-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Explore
                    </button>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Adventure Chatbot Button */}
      <button
        onClick={isVisible}
        className="fixed bottom-10 right-6 bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 hover:from-rose-700 hover:via-orange-600 hover:to-amber-600 z-10 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 transform ring-4 ring-orange-200 ring-opacity-50 hover:ring-opacity-100"
      >
        <span className="text-white text-2xl">💬</span>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
      </button>

      {visible && (
        <div className="fixed bottom-2 right-2 bg-white rounded-2xl shadow-2xl p-6 z-20 ring-4 ring-orange-200 ring-opacity-50">
          <iframe height="430" width="350" src="https://console.dialogflow.com/api-client/demo/embedded/82a54d4d-d09d-4b6e-9a50-7c8376b44eda"></iframe>
        </div>
      )}
    </div>
  );
}
