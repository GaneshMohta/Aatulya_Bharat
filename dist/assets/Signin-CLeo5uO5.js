import{j as e,a as l}from"./index-BMDUoIZi.js";import{r}from"./vendor-BvbJF06O.js";import{b as j,u as f,L as v}from"./KnowIndia-B2i9pOXf.js";import{G as w}from"./iconBase-BmOo4IvN.js";/* empty css             */function _(a){return w({tag:"svg",attr:{version:"1.1",x:"0px",y:"0px",viewBox:"0 0 48 48",enableBackground:"new 0 0 48 48"},child:[{tag:"path",attr:{fill:"#FFC107",d:`M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12\r
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24\r
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z`},child:[]},{tag:"path",attr:{fill:"#FF3D00",d:`M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657\r
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z`},child:[]},{tag:"path",attr:{fill:"#4CAF50",d:`M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36\r
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z`},child:[]},{tag:"path",attr:{fill:"#1976D2",d:`M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571\r
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z`},child:[]}]})(a)}function c(){const a=async t=>{try{if(t.code){console.log("Authorization Code:",t.code);const s=await l.post("https://aatulya-bharat.onrender.com/api/v1/auth/google",{code:t.code});console.log(s.data.user),n("/")}else throw console.error("Google Auth Failed:",t),new Error(t)}catch(s){console.error("Login Error:",s.message)}},i=j({onSuccess:a,onError:a,flow:"auth-code"}),[d,m]=r.useState(""),[g,h]=r.useState(""),n=f(),x=t=>{m(t.target.value)},p=t=>{h(t.target.value)},u=async t=>{t.preventDefault();const s={email:d,password:g};console.log(s);try{const o=await l.post("https://aatulya-bharat.onrender.com/user/login",s);console.log(o),localStorage.setItem("token",o.data.token),localStorage.setItem("Bharat_email",o.data.email),n("/")}catch{console.log("not valid")}};return e.jsx("div",{children:e.jsxs("div",{className:"signin-main",children:[e.jsxs("div",{className:"sign-f1",children:[e.jsx("div",{children:e.jsx("h1",{children:"Bharat"})}),e.jsx("p",{children:"Sign up for Best Experience"}),e.jsx("button",{className:"sgn_btn flex justify-center w-[100%] text-base ",onClick:i,children:e.jsx(_,{})}),e.jsxs("p",{children:[e.jsx("span",{className:"or",children:"________"})," or ",e.jsx("span",{className:"or",children:"________"})]}),e.jsx("button",{className:"text-xs",children:"Continue with mail"}),e.jsx("hr",{className:"w-11/12 text-center relative translate-x-2 text-stone-900 bg-slate-950"}),e.jsx("div",{className:"flex justify-center",children:e.jsxs("form",{className:"flex flex-col gap-3 w-80 rounded-md items-center",children:[e.jsx("input",{className:"w-[32vh] p-1 ms-2 rounded-md text-sm",type:"mail",name:"email",id:"email",placeholder:"Ganesh@gmail.com",onChange:x}),e.jsx("input",{className:"w-[32vh] p-1 ms-2 rounded-md",placeholder:"....",type:"password",name:"password",id:"password",onChange:p}),e.jsx("button",{type:"submit",onClick:u,className:"bg-blue-500 w-[15vh] ms-5 text-xs rounded-lg p-1",children:"Login"})]})}),e.jsxs("p",{className:"link",children:["Don't have an Account ",e.jsx(v,{to:"/signup",element:e.jsx(c,{}),className:"text-blue-400 hover:text-blue-700",children:"Register"})]})]}),e.jsx("div",{className:"sign-f2",children:e.jsx("img",{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR-9llGNNZGv9wB4UKWCcdiXxxroFI48Le0g&s",width:"100%"})})]})})}const G=Object.freeze(Object.defineProperty({__proto__:null,default:c},Symbol.toStringTag,{value:"Module"}));export{_ as F,c as S,G as a};