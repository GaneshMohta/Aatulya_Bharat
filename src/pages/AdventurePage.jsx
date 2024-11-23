import React from 'react'
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function AdventurePage() {
  const attractions = [
    { id: 1, name: 'College Trips', description: 'make memorable to ur Journey', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU1gARMF4qrJHK2_Xde2m8rE1fHV2JJA7mlQ&s' },
    { id: 2, name: 'Islands, Andaman-Nicobar', description: 'Island is Filled with Attractive adventure', imgSrc: 'https://htoindia.com/wp-content/uploads/2019/06/Andaman-Nicobar-Island.jpg' },
    { id: 3, name: 'Hawa Mahal, Jaipur', description: 'Pink City', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIy16C95WyISHMYiweGNYba4p2f5kdZD_heQ&s' },
    // Add more attractions as needed
  ];
  return (
    <div>

        <div className="flex justify-between p-2 bg-slate-300 ">
        <div className="flex gap-2">
          <Link to="/">
            <span className="text-slate-950 relative top-1">
              <BsArrowLeftShort />
            </span>
          </Link>
          <h3>Aatulya Bharat</h3>
        </div>
      </div>

      <header className="att-header">
      <div className="logo">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvZjGuKX2pqDKgyMm3MBj-QKPYSCR0f5V56w&s" alt="DOOK International" className='w-[100vw] h-[100%]' />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search for Destinations, Attractions, Activities, Experiences & Countries" />
        <button>Search</button>
      </div>
    </header>

      <div className="attractions-container">
      <h2>Top Tourist Attractions In India</h2>
      <p>Explore the best tourist destinations in India.</p>
      <div className="attractions-grid">
        {attractions.map(attraction => (
          <div key={attraction.id} className="attraction-card">
            <img src={attraction.imgSrc} alt={attraction.name} className="attraction-img" />
            <div className="attraction-info">
              <h3>{attraction.name}</h3>
              <p>{attraction.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>


    </div>
  )
}