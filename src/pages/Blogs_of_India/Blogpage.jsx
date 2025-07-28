import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BsArrowLeftShort } from 'react-icons/bs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Blogpage() {
  const [singleBlog, setSingleBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        //console.log("Fetching blog data...");
        const response = await axios.get(`https://aatulya-bharat.onrender.com/blog/${id}`);
        setSingleBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!singleBlog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading blog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-rose-700 to-orange-400 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Link
                to="/blogs"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
              >
                <BsArrowLeftShort className="text-white text-2xl" />
              </Link>
              <h2 className="text-white text-xl font-semibold tracking-wide">
                Aatulya Bharat
              </h2>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Image */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            <img
              src={`https://aatulya-bharat.onrender.com/uploads/${singleBlog.image}`}
              alt={singleBlog.Title}
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Content Section */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Title Section */}
          <div className="px-6 sm:px-8 py-8 border-b border-gray-100">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center leading-tight">
              {singleBlog.Title}
            </h1>
          </div>

          {/* Blog Content */}
          <div className="px-6 sm:px-8 py-8">
            <div className="prose prose-lg max-w-none mx-auto">
              <ReactQuill
                value={singleBlog.QuillContent}
                readOnly={true}
                theme="bubble"
                className="text-gray-700 "
              />
            </div>
          </div>
        </article>


        <div className="mt-12 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-600 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:from-rose-700 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
          >
            <BsArrowLeftShort className="mr-2 text-xl" />
            Back to All Blogs
          </Link>
        </div>
      </main>
    </div>
  );
}
