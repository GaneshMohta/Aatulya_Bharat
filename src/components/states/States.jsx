import React, { useEffect, useState, useMemo } from "react";
import "./state.css";
import { useSelector } from "react-redux";
import Carousel from "./Carousel";
import jsondata from './states.json';
import ErrorPage from "../../pages/ErrorPage";
// import {ErrorPage} from './ErrorPage.jsx'

const NavigationBar = () => {
  const goBack = () => {
    // Since we can't use React Router Link, we'll use a simple back function
    window.history.back();
  };

  return (
    <div className="flex justify-between p-4 bg-gradient-to-r text-gradient-to-r from-rose-700 to-orange-300 shadow-lg">
      <div className="flex gap-3 items-center">
        <button
          onClick={goBack}
          className="text-gradient-to-r from-red-500 to-orange-300 hover:text-gray-200 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-white font-semibold text-lg">Aatulya Bharat</h3>
      </div>
    </div>
  );
};

export default function States() {
  // const currState = useSelector((state) => state.state.statesName);
  const [selectedState, setSelectedState] = useState(null);
  const currState = localStorage.getItem('currState');

  useEffect(() => {
    const theState = jsondata.find(state => state.name === currState);
    if (theState) {
      setSelectedState(theState);
    }
  }, []);

  const images = useMemo(() => selectedState?.image || [], [selectedState]);

  if (!selectedState) return <ErrorPage />

  return (
    <>
    <NavigationBar />
    <div className="bg-slate-200 py-2">

      <h1 className="text-center text-red-700 h-8 uppercase">
        {selectedState.stateMoto}
      </h1>

      <div className="w-[70%] h-[50%] m-auto rounded-lg">
        <Carousel slides={images} />
      </div>

      <div>
        <h1 className="text-center uppercase h-10 text-red-700 p-2">
          {selectedState.stateSubMoto}
        </h1>
      </div>

      <div className="about p-0 m-0 w-[100%]">
        <div className="w-[100%]">
          <h1 className="text-center font-extrabold font-sans">
            {selectedState.HOS}
          </h1>
        </div>

        <div className="flex justify-between py-3">
          <img src={selectedState.wall} className="max-w-28 min-h-96" />

          <div className="py-14">
            <a href={selectedState.HOSImage}>
              <img
                src={selectedState.HOSImage}
                width={"240px"}
                height={"250px"}
                className="flex align-middle relative top-3"
              />
            </a>
          </div>

          <div className="w-1/2 py-5">
            <p className="font-mono font-medium text-sm">
              {selectedState.History}
              <span className="text-blue-300"> Click the picture to know more</span>
            </p>
          </div>

          <img src={selectedState.wall} className="max-w-28 min-h-96" />
        </div>
      </div>


      <div className="relative z-10 py-20 bg-gradient-to-br from-rose-500 to-orange-400  backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-200 mb-4">
            Beauty And Culture
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-slate-400 to-white/45 mx-auto mb-16 rounded-full"></div>

          <div className="space-y-12">
            {selectedState.Cultures.map((info, index) => (
              <div key={index} className="group">
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>

                  {/* Image */}
                  <div className="lg:w-1/2">
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-500">
                      <img
                        src={info.image}
                        alt={`Culture ${index + 1}`}
                        className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 group-hover:from-black/30 transition-all duration-500"></div>
                      <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-1/2">
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-500 group-hover:transform">
                      <div className="relative">
                        <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20"></div>
                         <p className="text-white/95 text-lg leading-relaxed font-normal">
                          {info.txt}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
