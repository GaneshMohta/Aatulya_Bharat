import React, { lazy, useEffect,useState } from "react";
import "./front.css";
import { FaShoppingCart } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { arraycart, incrementitem } from "../Redux/cartSlice";
import axios from "axios";
import { fetchProducts } from "../Redux/productSlice";


// Dummy data for products
const dummyProducts = [
  {
    id: 1,
    productName: "Handwoven Silk Saree",
    price: 2500,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=300&fit=crop",
    category: "fashion"
  },
  {
    id: 2,
    productName: "Brass Decorative Lamp",
    price: 850,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
    category: "home"
  },
  {
    id: 3,
    productName: "Organic Masala Chips",
    price: 120,
    image: "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=300&h=300&fit=crop",
    category: "snacks"
  },
  {
    id: 4,
    productName: "Khadi Cotton Kurta",
    price: 1200,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop",
    category: "fashion"
  },
  {
    id: 5,
    productName: "Wooden Wall Art",
    price: 950,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
    category: "home"
  },
  {
    id: 6,
    productName: "Spiced Namkeen Mix",
    price: 180,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=300&fit=crop",
    category: "snacks"
  },
  {
    id: 7,
    productName: "Embroidered Dupatta",
    price: 680,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=300&h=300&fit=crop",
    category: "fashion"
  },
  {
    id: 8,
    productName: "Copper Water Bottle",
    price: 450,
    image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=300&h=300&fit=crop",
    category: "home"
  }
];

// Simple Carousel Component
const SimpleCarousel = ({ children, responsive }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4; // Default for desktop

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView >= children.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, children.length - itemsPerView) : prev - 1
    );
  };



  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
      >
        {children}
      </div>
      {children.length > itemsPerView && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10"
          >
            <span className="text-xl">‹</span>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10"
          >
            <span className="text-xl">›</span>
          </button>
        </>
      )}
    </div>
  );
};

// NavBar Component
const NavBar = () => {
  const arr = useSelector((state)=>state.cart.data)
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Link to='/orderCart'><span className="text-2xl">🛒</span></Link>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {arr.length}
        </span>
      </div>
      <div className="text-2xl">👤</div>
    </div>
  );
};

export default function MakeIndia() {
  const [products, setProducts] = useState([]);
 // const [cart, setCart] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    // Simulate loading products
    setTimeout(() => {
      setProducts(dummyProducts);
    }, 500);
  }, []);

  const cartAdded = (item) => {
    dispatch(arraycart(item));
   // setCart(prev => [...prev, item]);
   // console.log('Added to cart:', cart);
  };

  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  const ProductCard = ({ product }) => (
    <div className="flex-shrink-0 w-1/4 px-2">
      <div className="bg-white rounded-xl shadow-lg  overflow-hidden">
        <div className="relative group">
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white/90 hover:bg-white rounded-full p-2 shadow-md">
              <span className="text-red-500 text-xl">♡</span>
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">{product.productName}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">₹{product.price}</span>
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              onClick={() => cartAdded(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CategorySection = ({ title, products }) => (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
          {title}
        </h2>
        {products.length > 4 && (
          <button className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105">
            View All
          </button>
        )}
      </div>
      <SimpleCarousel>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleCarousel>
    </div>
  );

  if (!products.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-rose-700 to-orange-300 shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left section */}
            <div className="flex items-center gap-3">
              <Link to='/' className="text-gray-600 hover:text-gray-800 text-2xl">
                ←
              </Link>
              <h1 className="text-xl font-semibold text-gray-800">Atulya Bharat</h1>
            </div>

            {/* Center section */}
            <div className="flex flex-col items-center">
              <img
                src="https://imagesvs.oneindia.com/webp/img/2015/06/02-1433264361-makeinindia-logo.jpg"
                alt="Make in India"
                className="h-12 w-auto"
              />
              <span className="text-blue-50 font-bold text-sm tracking-wider">
                MAKE IN BHARAT
              </span>
            </div>

            {/* Right section */}
            <NavBar />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Discover Authentic Indian Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Support local artisans and businesses with our curated collection of genuine Indian products
          </p>
        </div>

        {/* Product Categories */}
        <CategorySection
          title="Best Seller in Home & Decoration"
          products={getProductsByCategory('home')}
        />

        <CategorySection
          title="Best Seller in Indian Snacks"
          products={getProductsByCategory('snacks')}
        />

        <CategorySection
          title="Best Seller in Fashion"
          products={getProductsByCategory('fashion')}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-rose-700 to-orange-300 text-white py-7 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Make in Bharat</h3>
          <p className="text-orange-100">Supporting Indian craftsmanship and entrepreneurship</p>
        </div>
      </footer>
    </div>
  );
}
