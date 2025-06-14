import React, { useEffect , lazy, useState } from 'react'
import "../pages/front.css"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// const setBlogs = lazy(()=>import('../Redux/blogslice'))
import { setBlogs } from '../Redux/blogslice';
import axios from 'axios';

const BlogofIndia = () => {

  const [blog,setBlog] = useState([]);
  useEffect(()=>{
      getBlogs();
  },[])

  const dispatch = useDispatch();
  const navigate=useNavigate();

  const getBlogs= async()=>{
    const res= await axios.get("https://aatulya-bharat.onrender.com/blog/get", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // dispatch(setBlogs(res.data));
    setBlog(res.data);

  }

   const moveBlogs=()=>{
    window.scrollTo(0, localStorage.getItem('position'));
    navigate('/blogs');
   }




  return (
    <div>
          <div className='p-2 flex m-2 flex-wrap justify-around gap-7 h-fit mb-0 aatulya-header'>
          <div className='p-card text-center'>
          {
            blog.map((item) => (
                <Link to={`blog/${item.id}`} key={item.Titleid}>
                <div className='card text-center'>
                <img src={`https://aatulya-bharat.onrender.com/uploads/${item.image}`} alt="image"  className='h-48 w-48 rounded-t-lg'/>
                <h3 className='whitespace-nowrap overflow-hidden text-ellipsis pb-0 ps-2 pe-1'>{item.Title}</h3>
                <span className='text-center font-thin author p-0 relative bottom-2'>{item.author}</span>
                </div>
                </Link>
                ))
        }
          <div className='flex justify-end pe-12 pb-3'>
          <button className='flex justify-center items-center rounded-md font-semibold font-serif bg-slate-400 w-32 h-8
          hover:bg-slate-700 transition-all duration-500 ease-in-out transform hover:scale-100 hover:shadow-lg cursor-pointer'
           onClick={moveBlogs}>View All</button>

        </div>
          </div>

        </div>
    </div>
  )
}

export default BlogofIndia;
