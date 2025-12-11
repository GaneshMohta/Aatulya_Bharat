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
const BlogofIndia = lazy(() => import('../Blogs_of_India/BlogofIndia'));

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

// Sticky Header Component (Common for all slides)
const StickyHeader = ({ currentSlide }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="sticky-header-content">
        <div className="header-left">
          <Link to="/" className="logo-link">
            <span className="logo-text">Incredible India</span>
          </Link>
        </div>

        <div className="header-center">
          <h1 className="header-title-text">{currentSlide?.headerTitle || 'Explore India'}</h1>
        </div>

        <div className="header-right">
          <ProfileDrop />
        </div>
      </div>
    </header>
  );
};

const CarouselSlide = ({ item }) => (
  <div className="hm-m1">
    <img
      src={item.img}
      alt={item.headerTitle || 'Carousel image'}
      className="hm-img"
    />

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
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleSlideChange = useCallback((previousSlide, { currentSlide }) => {
    setCurrentSlideIndex(currentSlide);
  }, []);

  if (isLoading) {
    return (
      <div className="page-container">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="page-container bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">
      {/* Sticky Header */}
      <StickyHeader currentSlide={carouselItems[currentSlideIndex]} />

      <main>
        <section className="carousel-section" aria-label="Featured content carousel">
          <CarouselErrorBoundary>
            <HomeCarusel afterChange={handleSlideChange} />
          </CarouselErrorBoundary>
        </section>

        <div className="content-container bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">
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
