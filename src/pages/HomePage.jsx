import React, { lazy, useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CgProfile } from "react-icons/cg";

import { homes } from './homeJson';
import './front.css';
import './responsive.css';

// Lazy load components
const Bestofindia = lazy(() => import('./Bestofindia'));
const BlogofIndia = lazy(() => import('../compounds/BlogofIndia'));

// Constants
const CAROUSEL_CONFIG = {
  responsive: {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 2500 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 2500, min: 1000 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1000, min: 904 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 900, min: 400 },
      items: 1
    }
  },
  autoPlay: true,
  autoPlaySpeed: 4000,
  infinite: true,
  arrows: false,
  showDots: false,
  transitionDuration: 2000,
  pauseOnHover: false
};

const LOADING_DELAY = 300;

// Custom hooks
const useUserAuth = () => {
  return useMemo(() => {
    const userEmail = localStorage.getItem('Bharat_email');
    if (!userEmail) return { isAuthenticated: false, username: null };

    const username = userEmail.split('@')[0];
    return { isAuthenticated: true, username };
  }, []);
};

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

// Components
const ProfileDropdown = ({ isVisible, onToggle, user }) => (
  <div className="relative">
    <CgProfile
      onClick={onToggle}
      className="cursor-pointer text-xl hover:text-blue-600 transition-colors"
      role="button"
      tabIndex={0}
      aria-label="Profile menu"
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
    />
    {isVisible && (
      <div className="absolute top-8 right-0 bg-white shadow-lg rounded-lg p-3 min-w-[120px] z-50 border">
        {!user.isAuthenticated ? (
          <Link
            to="/signin"
            className="block w-full"
            onClick={onToggle}
          >
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm py-2 px-4 rounded transition-colors w-full">
              Sign In
            </button>
          </Link>
        ) : (
          <Link
            to="/profile"
            className="text-blue-500 hover:text-blue-700 font-medium transition-colors block"
            onClick={onToggle}
          >
            {user.username}
          </Link>
        )}
      </div>
    )}
  </div>
);

const CarouselSlide = ({ item }) => (
  <div className="relative h-auto bg-white hm-m1">
    <img
      src={item.img}
      alt={item.headerTitle || 'Carousel image'}
      className="w-full hm-img object-cover"
      loading="lazy"
    />

    <div className="absolute top-4 flex justify-between items-center w-full px-4 hm-h1">
      <div className="flex-1" />
      <div className="flex-1 text-center">
        <h1 className="text-xl font-semibold text-gray-800 drop-shadow-sm">
          {item.headerTitle}
        </h1>
      </div>
      <div className="flex-1 flex justify-end">
        <ProfileDropdownContainer />
      </div>
    </div>

    {item.isTyping ? (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-[30vh] flex items-center justify-center">
          <h1 className="matemasie-regular typewriter text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
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
  <div className="absolute top-[30vh] left-4 md:left-[10vh] backdrop-card max-w-[90vw] md:max-w-none">
    <div className="w-full md:w-[40vw] backdrop-blur-sm bg-white/30 p-4 md:p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <h2 className="text-orange-600 font-bold text-lg md:text-xl mb-2">
          {item.backdropTitle}
        </h2>
        <p className="text-gray-800 text-sm md:text-base mb-4 leading-relaxed">
          {item.backdropSubtitle}
        </p>
        <Link to={item.link}>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 px-6 rounded-md transition-colors shadow-md">
            Explore
          </button>
        </Link>
      </div>

      {item.backdropImg && (
        <div className="w-full md:w-36 h-32 flex-shrink-0">
          <img
            src={item.backdropImg}
            alt={item.backdropTitle || 'Backdrop image'}
            className="w-full h-full object-cover rounded-2xl shadow-md"
            loading="lazy"
          />
        </div>
      )}
    </div>
  </div>
);

const ProfileDropdownContainer = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const user = useUserAuth();

  const toggleDropdown = useCallback(() => {
    setDropdownVisible(prev => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownVisible && !event.target.closest('.relative')) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownVisible]);

  return (
    <ProfileDropdown
      isVisible={isDropdownVisible}
      onToggle={toggleDropdown}
      user={user}
    />
  );
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
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
        <div className="text-center py-8">
          <p className="text-gray-600">Something went wrong loading the carousel.</p>
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
      <div className="bg-slate-50 min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <main>
        <section aria-label="Featured content carousel">
          <CarouselErrorBoundary>
            <Carousel {...CAROUSEL_CONFIG}>
              {carouselItems.map((item, index) => (
                <CarouselSlide
                  key={item.id || index}
                  item={item}
                />
              ))}
            </Carousel>
          </CarouselErrorBoundary>
        </section>

        <div className="container mx-auto px-4">
          <section className="my-20" aria-label="Best of India">
            <React.Suspense fallback={<LoadingSpinner />}>
              <Bestofindia />
            </React.Suspense>
          </section>

          <section aria-label="Blog content">
            <React.Suspense fallback={<LoadingSpinner />}>
              <BlogofIndia />
            </React.Suspense>
          </section>
        </div>
      </main>
    </div>
  );
}
