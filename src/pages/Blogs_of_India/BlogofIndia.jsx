import React, { useEffect , lazy, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// const setBlogs = lazy(()=>import('../Redux/blogslice'))
import { setBlogs } from '../../Redux/blogslice';
import axios from 'axios';
import './blog.css'
import '../Home_Page/responsive.css'

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
    window.scrollTo(1, localStorage.getItem('position'));
    navigate('/blogs');
   }



if(blog.length >= 1){
  return (
    <section className='blogs-section'>
      <div className='blogs-container'>
        <header className='blogs-header'>
          <h1 className='blogs-title'>Blogs</h1>
          <p className='blogs-subtitle'>Thought and Express of India</p>
        </header>
      </div>

      <div className='blogs-grid'>
          {
          blog.slice(0,3).map((blogs,idx)=> {
            return (
              <Link to={`blogs/${blogs.Titleid}`} key={idx}>
                <div className='w-[60%] sm:h-80 sm:w-48 md:h-96'>
                  <img src={blogs.image} alt={blogs.Title} className='h-[40%] sm:h-80 md:h-96' loading='lazy' />
                  <div className='h-[50%]'>
                    <p>{blogs.Title}</p>
                    <span className="blog-cta">Read More..</span>
                  </div>
                </div>
              </Link>
            );
          })
          }
          <div><Link to='/blogs'><button className='max-w-fit p-2 bg-gradient-to-r from-orange-400 to-rose-400 rounded-md'>See All</button></Link></div>
      </div>
    </section>
  )
}
}


export default BlogofIndia;
