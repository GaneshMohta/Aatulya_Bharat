function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-BMDUoIZi.js","assets/vendor-BvbJF06O.js","assets/index-DTwfQFNQ.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as i,u as n,a as c,b as d,j as s}from"./index-BMDUoIZi.js";import{r as h}from"./vendor-BvbJF06O.js";/* empty css              */import{u as p,L as m}from"./KnowIndia-B2i9pOXf.js";const g=lazy(()=>i(()=>import("./index-BMDUoIZi.js").then(t=>t.e),__vite__mapDeps([0,1,2]))),j=()=>{h.useEffect(()=>{o()},[]);const t=n(),a=p(),o=async()=>{const e=await c.get("https://aatulya-bharat.onrender.com/blog/get");console.log(e),t(g(e.data))},r=()=>{window.scrollTo(0,localStorage.getItem("position")),a("/blogs")},l=d(e=>e.blog.blogs);return s.jsx("div",{children:s.jsx("div",{className:"p-2 flex m-2 flex-wrap justify-around gap-7 h-fit mb-0 aatulya-header",children:s.jsxs("div",{className:"p-card text-center",children:[l.map(e=>s.jsx(m,{to:`blog/${e.id}`,children:s.jsxs("div",{className:"card text-center",children:[s.jsx("img",{src:`https://aatulya-bharat.onrender.com/uploads/${e.image}`,alt:"image",className:"h-48 w-48 rounded-t-lg"}),s.jsx("h3",{className:"whitespace-nowrap overflow-hidden text-ellipsis pb-0 ps-2 pe-1",children:e.Title}),s.jsx("span",{className:"text-center font-thin author p-0 relative bottom-2",children:e.author})]})},e.Titleid)),s.jsx("div",{className:"flex justify-end pe-12 pb-3",children:s.jsx("button",{className:`flex justify-center items-center rounded-md font-semibold font-serif bg-slate-400 w-32 h-8\r
          hover:bg-slate-700 transition-all duration-500 ease-in-out transform hover:scale-100 hover:shadow-lg cursor-pointer`,onClick:r,children:"View All"})})]})})})};export{j as default};