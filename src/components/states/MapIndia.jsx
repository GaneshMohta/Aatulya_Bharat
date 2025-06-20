import { useState } from 'react';
import India from "@react-map/india";
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeftShort } from "react-icons/bs";
import img from "./image/54alusrv.png"
//import { useDispatch } from 'react-redux';



const STATES = {
  Maharashtra: {
    value: 50,
    content: {
      name: "Maharashtra",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A quisquam quae laboriosam sed magni aliquam dolore sequi libero harum, hic nihil. Omnis eos deserunt molestiae harum, cum nemo et temporibus?"
    }
  }
};

export default function MapIndia() {
  const navigate = useNavigate();
  const [selectedStates, setSelectedStates] = useState([]);

  const handleSelect = (state, selectedStatesArray) => {

    console.log('Selected state:', state);

    setSelectedStates(selectedStatesArray || [state]);

    if (selectedStatesArray === undefined) {
      const stateName = state.replace(/\s/g, "");
      localStorage.setItem('currState',stateName);
      navigate('/wonders');
    }
  };

  return (
    <div className='maps' style={{
      backgroundImage: `url(${img})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight:'100vh'
    }}>
      <div className='aatulya-header flex justify-between p-2 sticky top-0 z-50 bg-slate-200 items-center'>
        <div className='flex gap-2'>
          <Link to='/'>
            <span className='text-gray-700 text-2xl relative top-1'>
              <BsArrowLeftShort />
            </span>
          </Link>
          <h3 className='text-xl font-semibold text-gray-800'>Atulya Bharat</h3>
        </div>
      </div>

      <div className='map-container  flex justify-center '>
        <India
          type="select-single"
          size={500}
          mapColor="lightblue"
          strokeColor="black"
          strokeWidth={1}
          hoverColor="orange"
          selectColor="green"
          hints={true}
          hintTextColor="white"
          hintBackgroundColor="black"
          hintPadding={5}
          hintBorderRadius={5}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}
