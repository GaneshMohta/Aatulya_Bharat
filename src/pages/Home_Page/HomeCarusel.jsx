import React, { useEffect, useState } from 'react';
import ProfileDrop from './ProfileDrop';
import { Link } from 'react-router-dom';
import { homes } from '../homeJson';
import { motion } from "framer-motion";

// BackdropCard Component
const BackdropCard = ({ item }) => (
  <div className="backdrop-card">
    <div className="backdrop-content">
      <div className="backdrop-text">
        <h2 className="backdrop-title">{item.backdropTitle}</h2>
        <p className="backdrop-subtitle">{item.backdropSubtitle}</p>
        <Link to={item.link}>
          <button className="explore-button">Explore</button>
        </Link>
      </div>
      {item.backdropImg && (
        <div className="backdrop-image-container">
          <img
            src={item.backdropImg}
            alt={item.backdropTitle || 'Backdrop image'}
            className="backdrop-image"
            loading="lazy"
          />
        </div>
      )}
    </div>
  </div>
);

const CarouselSlide = ({ item }) => (
  <div className="hm-m1">
    <img
      src={item.img}
      alt={item.headerTitle || 'Carousel image'}
      className="hm-img"
      loading="lazy"
    />
    {item.isTyping ? (
      <div className="typewriter-container">
        <div className="typewriter-content">
          <h1 className="matemasie-regular typewriter">
            {item.Typewriter}
          </h1>
        </div>
      </div>
    ) : (
      <BackdropCard item={item} />
    )}
  </div>
);

const HomeCarusel = () => {
  const [homeData, setHomeData] = useState([]);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setHomeData(homes);
  }, []);

  useEffect(() => {
    if (!homeData.length) return;
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % homeData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [homeData.length]);

  if (!homeData.length) return null;

  return (
    <div className="carousel-container">
      <motion.div
        className="carousel-track"
        animate={{ x: `-${slide * 100}%` }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {homeData.map((item) => (
          <div key={item.id} className="carousel-slide">
            <CarouselSlide item={item} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HomeCarusel;
