import React, { lazy, useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { homes } from '../homeJson';
import '../front.css';
import './responsive.css';
import ProfileDrop from './ProfileDrop';
import HomeCarusel from './HomeCarusel';

// Lazy load components
const Bestofindia = lazy(() => import('./Bestofindia'));
// const BlogofIndia = lazy(() => import('../Blogs_of_India/BlogofIndia'));

import BlogofIndia from '../Blogs_of_India/BlogofIndia';

// Constants
const CAROUSEL_CONFIG = {
  responsive: {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1920 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 1920, min: 1025 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 769 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1
    }
  },
  autoPlay: false,
  infinite: true,
  arrows: true,
  showDots: false,
  pauseOnHover: false,
};

const LOADING_DELAY = 300;



const useCarouselData = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCarouselItems(homes);
      setIsLoading(false);
    }, LOADING_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return { carouselItems, isLoading };
};

const CarouselSlide = ({ item }) => (
  <div className="hm-m1">
    <img
      src={item.img}
      alt={item.headerTitle || 'Carousel image'}
      className="hm-img"
      loading="lazy"
    />

    <div className="hm-h1">
      <div className="header-spacer" />
      <div className="header-title">
        <h1>{item.headerTitle}</h1>
      </div>
      <div className="header-profile">
         <ProfileDrop key={item.id} />
      </div>
    </div>

    {item.isTyping ? (
      <div className="typewriter-container">
        <div className="typewriter-content">
          <h1 className="matemasie-regular typewriter">
            INCREDIBLE INDIA
          </h1>
        </div>
      </div>
    ) : (
      <BackdropCard item={item} />
    )}
  </div>
);

const BackdropCard = ({ item }) => (
  <div className="backdrop-card">
    <div className="backdrop-content">
      <div className="backdrop-text">
        <h2 className="backdrop-title">{item.backdropTitle}</h2>
        <p className="backdrop-subtitle">{item.backdropSubtitle}</p>
        <Link to={item.link}>
          <button className="explore-button">
            Explore
          </button>
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



const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
);

// Error Boundary Component
class CarouselErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Carousel error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <p>Something went wrong loading the carousel.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main Component
export default function HomePage() {
  const { carouselItems, isLoading } = useCarouselData();

  if (isLoading) {
    return (
      <div className="page-container">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="page-container">
      <main>
        <section className="carousel-section" aria-label="Featured content carousel">
          <CarouselErrorBoundary>

          <HomeCarusel  />
          {/* <Carousel {...CAROUSEL_CONFIG}> */}
              {/* {carouselItems.map((item, index) => (
                <CarouselSlide
                  key={item.id}
                  item={item}
                />
              ))}



              {
                Array.from({length:3}).map((_, index) => {
                  const item = carouselItems[index % carouselItems.length];
                  return (
                <CarouselSlide
                  // key={index}
                  item={item}
                />
                  )
                })
              }
             </Carousel> */}
          </CarouselErrorBoundary>
        </section>

        <div className="content-container">
          <section className="bestofindia-section" aria-label="Best of India">
            <React.Suspense fallback={<LoadingSpinner />}>
              <Bestofindia />
            </React.Suspense>
          </section>

          <section className="blog-section" aria-label="Blog content">
            <React.Suspense fallback={<LoadingSpinner />}>
              <BlogofIndia />
            </React.Suspense>
          </section>
        </div>
      </main>
    </div>
  );
}
