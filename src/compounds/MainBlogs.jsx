import React, { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import ne from "../components/states/image/image.png";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { searchBlogs, setBlogs } from "../Redux/blogslice";
import { IoIosCreate } from "react-icons/io";
import axios from "axios";
import "./Blog.css";

export default function MainBlogs() {
  const [searchtext, setSearchText] = useState("");
  const [Blog,setBlogs]=useState([]);
  useEffect(() => {
    setourBlogs();
  }, []);
  const dispatch = useDispatch();

  const setourBlogs = async () => {
    const res = await axios.get("http://localhost:3000/blog/get", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setBlogs(res.data);
    // dispatch(setBlogs(res.data));
  };
//   const blogs = useSelector((state) => state.blog.blogs);
//   const filterblogs = useSelector((state) => state.blog.filterblog);

//   console.log(filterblogs);
  const handleSearch = async (category) => {
    const res = await axios.get("http://localhost:3000/blog/filter",{
        params : {category}
    });
    setBlogs(res.data);
  };

  const handleTitle = (e) => {
    setSearchText(e.target.value);
  };

  return (

    <div className="flex flex-col aatulya-responsive ">
    <div className="flex justify-around h-[10vh] bg-slate-300 aatulya-header sticky top-1 z-10 w-full">
        <Link to="/">
            <span className="z-10 relative top-[3vh] right-[20vw]">
                <BsArrowLeftShort />
            </span>
        </Link>
        <span className="absolute left-[40vw] top-3 text-[100%] font-bold">
            Aatulya Bharat
        </span>
        <Link to="/post" className="text-xl flex items-center relative left-[20%]">
            <IoIosCreate />
            <span className="text-base">Write</span>
        </Link>
    </div>

    <div className="flex aatulya-body border-2 h-full">
        <div className="w-[70vw] h-auto p-4 border-e-2">
            {Blog.map((ourblog) => (
                <Link to={`${ourblog.Titleid}`} key={ourblog.id} className="pt-2">
                    <div className="h-[30vh] gap-1 bg-zinc-400 flex m-2">
                        <div className="w-[70%] p-2">
                            <h1 className="text-xl font-semibold">{ourblog.Title}</h1>
                            <p className="text-sm">{ourblog.author}</p>
                        </div>
                        <div className="w-[30%] flex justify-end img-container">
                            <img src={`http://localhost:3000/uploads/${ourblog.image}`} alt="Blog" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>

        <div className="w-[30vw] sticky top-1 left-0 h-[90vh]">
            <h1 className="pt-4 text-xl ps-4">Recommended Topics</h1>
            <div className="flex justify-between py-3 flex-wrap gap-5 ps-4 pe-3">
                {["States", "Cultures", "Heritage", "Innovation"].map((topic) => (
                    <button
                        key={topic}
                        className="w-24 rounded-md text-slate-100 text-center h-8 bg-slate-950 hover:bg-slate-700 transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
                        onClick={() => handleSearch(topic)}
                    >
                        {topic}
                    </button>
                ))}
                <input
                    type="text"
                    className="bg-slate-950 text-slate-50 rounded-md w-32"
                    onChange={handleTitle}
                />
                <p className="bg-slate-950 relative  rounded-md text-slate-100">
                    <CiSearch />
                </p>
            </div>
        </div>
    </div>
</div>
  );
}
