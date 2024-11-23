import React, { useEffect, useState } from 'react';
import { useParams , Link } from 'react-router-dom';
import axios from 'axios';
import { BsArrowLeftShort } from 'react-icons/bs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Blog.css'

export default function Blogpage() {
  const [singleBlog, setSingleBlog] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log("Fetching blog data...");
        const response = await axios.get(`http://localhost:3000/blog/${id}`);
        setSingleBlog(response.data);


      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);
  if (!singleBlog) {
    return <div>Loading...</div>;
  }

   

  return (
    <div>
        <div className="flex justify-between p-2  bg-slate-300 ">
        <div className="flex gap-2">
          <Link to="/blogs">
            <span className="text-slate-950 relative top-1">
              <BsArrowLeftShort />
            </span>
          </Link>
          <h3>Aatulya Bharat</h3>
        </div>
      </div>

      <img src={`http://localhost:3000/uploads/${singleBlog.image}`} alt={singleBlog.Title} />
      <h1>{singleBlog.Title}</h1>
      <div className='w-[80vw] flex justify-center text-center '>
      <ReactQuill value={singleBlog.QuillContent} readOnly={true} theme="bubble" />
      </div>

    </div>
  );
}
