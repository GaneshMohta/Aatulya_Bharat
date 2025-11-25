import React, { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
// import { searchBlogs, setBlogs } from "../Redux/blogslice";
import { IoIosCreate } from "react-icons/io";
import axios from "axios";



// import React, { useEffect, useState } from "react";

export default function MainBlogs() {
  const [searchtext, setSearchText] = useState("");
  const [Blog, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setourBlogs();
  }, []);

  const setourBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://aatulya-bharat.onrender.com/blog/get", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (category) => {
    try {
      setLoading(true);
      const res = await fetch(`https://aatulya-bharat.onrender.com/blog/filter?category=${category}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error filtering blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTitle = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchtext.trim()) {
      // Implement search by title logic here
      console.log("Searching for:", searchtext);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
                <Link to= '/'>
              <button
                className="text-white hover:text-orange-100 transition-colors duration-200 text-2xl sm:text-3xl font-bold"
              >
                ←
              </button>
              </Link>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Atulya Bharat
              </h1>
            </div>
            <Link to='/Post'>
            <button
              className="flex items-center gap-2 bg-white hover:bg-orange-50 text-orange-600 font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Write</span>
            </button></Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Blog Posts Section */}
          <div className="w-full lg:w-2/3 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Latest Stories</h2>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
            ) : Blog.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <p className="text-gray-500 text-lg">No blogs found</p>
              </div>
            ) : (
              Blog.map((ourblog, index) => (
                <Link to={`${ourblog.Titleid}`}
                  key={ourblog.id || index}
                  className="block group"
                >
                  <article className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                    <div className="flex flex-col sm:flex-row h-full min-h-[200px] sm:min-h-[220px]">
                      <div className="w-full sm:w-2/3 p-5 sm:p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                            {ourblog.Title}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            {ourblog.author}
                          </p>
                        </div>
                        <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            5 min read
                          </span>
                        </div>
                      </div>
                      <div className="w-full sm:w-1/3 h-48 sm:h-auto relative overflow-hidden">
                        <img
                          src={ourblog.image || "https://via.placeholder.com/400x300"}
                          alt={ourblog.Title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Search Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Search Blogs</h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchtext}
                    onChange={handleTitle}
                    placeholder="Search by title..."
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200"
                  />
                  <button
                    onClick={handleSearchSubmit}
                    className="bg-gradient-to-r from-orange-500 to-rose-500 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Topics Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended Topics</h2>
                <div className="flex flex-wrap gap-3">
                  {["States", "Cultures", "Heritage", "Innovation"].map((topic) => (
                    <button
                      key={topic}
                      onClick={() => handleSearch(topic)}
                      className="px-5 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full hover:from-orange-500 hover:to-rose-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* About Section */}
              <div className="bg-gradient-to-br from-orange-100 to-rose-100 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">About Atulya Bharat</h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Discover the incredible stories, rich heritage, and diverse cultures of India through our curated collection of articles.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
