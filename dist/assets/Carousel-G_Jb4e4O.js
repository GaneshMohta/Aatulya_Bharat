import{j as e}from"./index-BMDUoIZi.js";import{r as o}from"./vendor-BvbJF06O.js";import{B as c,a as u}from"./index-Bt3Pi6bf.js";import"./iconBase-BmOo4IvN.js";function j({slides:r}){const[a,n]=o.useState(0),l=()=>{n(t=>t===0?r.length-1:t-1)},i=()=>{n(t=>t===r.length-1?0:t+1)};return o.useEffect(()=>{const t=setInterval(()=>{n(s=>s===r.length-1?0:s+1)},2e3);return()=>clearInterval(t)},[r.length]),e.jsxs("div",{className:"overflow-hidden relative",children:[e.jsx("div",{className:"flex transition ease-out duration-700",style:{transform:`translateX(-${a*100}%)`},children:r.map((t,s)=>e.jsx("img",{src:t},s))}),e.jsxs("div",{className:"absolute top-0 h-full w-full justify-between items-center flex text-ellipsis p-3 text-white size-6",children:[e.jsx("button",{onClick:l,children:e.jsx(c,{})}),e.jsx("button",{onClick:i,children:e.jsx(u,{})})]})]})}export{j as default};
