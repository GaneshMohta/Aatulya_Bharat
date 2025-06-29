import React, { useEffect, useState, useMemo } from "react";
import "./state.css";
import { useSelector } from "react-redux";
import Carousel from "./Carousel";
import jsondata from './states.json';

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

  if (!selectedState) return <div>Loading...</div>;

  return (
    <div className="bg-slate-200 py-6">
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

      <div>
        <h1 className="text-center font-extrabold font-sans mb-4 ">Beauty And Culture of the State</h1>
       <div className="ms-16 me-16 text-justify flex flex-col gap-4 mt-2">
  {
    selectedState.Cultures.map((info, index) => (
      <div key={index} className="flex flex-row gap-2 mt-2">
        <div className="flex bg-slate-200 p-4 rounded-xl shadow-lg">
          {
            index % 2 === 0 ? (
              <>
                <img src={info.image} alt="img" className="w-[22%] rounded-lg" />
                <p className="font-serif ps-3">{info.txt}</p>
              </>
            ) : (
              <>
                <p className="font-serif pe-3">{info.txt}</p>
                <img src={info.image} alt="img" className="w-[20%] rounded-lg" />
              </>
            )
          }
        </div>
      </div>
    ))
  }
</div>
      </div>
    </div>
  );
}
