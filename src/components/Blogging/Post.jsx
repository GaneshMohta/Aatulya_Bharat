import React, { useState, useMemo, useCallback, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import { GrAddCircle } from 'react-icons/gr';
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { v2 as cloudinary } from 'cloudinary';

export default function Post() {
  const [Title, setTitle] = useState('');
  const [image, setTitleFile] = useState('');
  const [filePreview, setFilePreview] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef(null);

  const category = [
    "States",
    "Heritage",
    "Innovation",
    "Cultures",
    "Taste",
    "Others",
  ];

  const handleCheckbox = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((category) => category !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setTitleFile(selectedFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setFilePreview(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    } else {
      alert('Please upload a valid image');
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "react_unsigned_upload");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dhn7ngwqs/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async () => {
    if (!Title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!content.trim()) {
      alert('Please write some content');
      return;
    }

    if (selectedCategories.length === 0) {
      alert('Please select at least one category');
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = "";

      if (image) {
        imageUrl = await uploadImageToCloudinary(image);
      }

      const token = localStorage.getItem("token");

      const blogData = {
        Title,
        QuillContent: content,
        selectedCategories: selectedCategories.join(','),
        image: imageUrl,
      };

      const response = await fetch("https://aatulya-bharat.onrender.com/blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();
      console.log("Blog created:", data);
      window.location.href = "/blogs";

    } catch (error) {
      console.error("Error uploading the post:", error);
      alert("Failed to create blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setTitleFile('');
    setFilePreview('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => window.history.back()}
                className="text-white hover:text-orange-100 transition-colors duration-200 text-2xl sm:text-3xl font-bold"
              >
                ←
              </button>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Atulya Bharat
              </h1>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-white hover:bg-orange-50 text-orange-600 font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="hidden sm:inline">Publishing...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="hidden sm:inline">Publish</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Share India's Story
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Create a blog that celebrates India's rich heritage and culture
          </p>
        </div>

        <div className="space-y-6">
          {/* Title Input */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
            <label htmlFor="Title" className="block text-sm font-medium text-gray-700 mb-2">
              Blog Title
            </label>
            <input
              type="text"
              name="Title"
              id="Title"
              className="w-full text-2xl sm:text-3xl font-bold text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors duration-200 py-3"
              placeholder="Enter an inspiring title..."
              value={Title}
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Image Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Featured Image
            </label>

            {!filePreview ? (
              <div className="relative">
                <input
                  type="file"
                  className="hidden"
                  id="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-12 h-12 mb-4 text-gray-400 group-hover:text-orange-500 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 group-hover:text-orange-600">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </label>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden group">
                <img
                  src={filePreview}
                  alt="Preview"
                  className="w-full h-auto max-h-96 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-4">
              Tell Your Story
            </label>
            <textarea
              ref={textareaRef}
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here... Share the fascinating stories, traditions, and insights about India."
              rows="15"
              className="w-full text-base sm:text-lg text-gray-800 bg-transparent border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200 p-4 resize-y min-h-[300px]"
            />
          </div>

          {/* Categories Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Categories
            </label>

            <div className="flex flex-wrap gap-3">
              {category.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCheckbox(cat)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategories.includes(cat)
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                  {selectedCategories.includes(cat) && (
                    <span className="ml-2">✓</span>
                  )}
                </button>
              ))}
            </div>

            {selectedCategories.length > 0 && (
              <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-800">
                  <span className="font-semibold">Selected:</span> {selectedCategories.join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* Submit Button (Mobile) */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Publish Blog
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
