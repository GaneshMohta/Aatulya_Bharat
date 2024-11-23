import { useState } from 'react'
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Rajastan from './components/states/Rajastan';
import Maharashtra from './components/states/Maharasthra';
import TamilNadu from './components/states/TamilNadu';
import Up from './components/states/Up';
import Mp from './components/states/Mp';
import Kerala from './components/states/Kerala';

import Gujarat from './components/states/Gujarat';
import './index.css'
import HomePage from './pages/HomePage';
import KnowIndia from './pages/KnowIndia';
import Post from './components/Blogging/Post';
import Blogpage from './compounds/Blogpage';
import Signup from './validation/Signup';
import MakeIndia from './pages/MakeIndia';
import MainBlogs from './compounds/MainBlogs';
import Cartpost from './components/MeraCart/Cartpost';
import OrderCart from './components/MeraCart/OrderCart';
import Ref from './pages/Ref';
import MapIndia from './components/states/MapIndia';
import WeddingPage from './pages/WeddingPage';
import Signin from './validation/Signin';
import Temple from './pages/Temple.jsx';
import AdventurePage from './pages/AdventurePage.jsx';
import Profile from './validation/Profile.jsx';



// const STATES = {
//   Maharashtra: {

//   }
// };

function App() {

  // const [activeState,setActiveState]=useState({
  //   data: STATES.Maharashtra,
  //   name: "India"
  // })
  // const [stateLists, newStateLists] = useState(STATES)
 // style={{position:'relative',right:'5%',margin:"0%",padding:"0%"}}



  return (
    <>
    <GoogleOAuthProvider clientId="990977981881-5hkqf6bqhkij2jit0pq1cge935gp37rf.apps.googleusercontent.com">
      <Router>
        <Routes>
        <Route path='/ref' element={<Ref />}></Route>
        <Route path='/'  element={<HomePage />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
          <Route path='/map'  element={<MapIndia/>}></Route>
          <Route path='/Rajasthan'  element={<Rajastan/>}></Route>
          <Route path='/Maharashtra' element={<Maharashtra/>}></Route>
          <Route path='/TamilNadu' element={<TamilNadu/>}></Route>
          <Route path='/Kerala' element={<Kerala/>}></Route>
          <Route path='/MadhyaPradesh' element={<Mp/>}></Route>
          <Route path='/UttarPradesh' element={<Up/>}></Route>
          <Route path='/KnowIndia' element={<KnowIndia/>}></Route>
          <Route path='/Post' element={<Post />}></Route>
          <Route path="/blogs/:id" element={<Blogpage />}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/Make-in-India' element={<MakeIndia/>}></Route>
          <Route path='/blogs' element={<MainBlogs />}></Route>
          <Route path='/MyBusiness' element={<Cartpost />}></Route>
          <Route path='/orderCart' element={<OrderCart />}></Route>
          <Route path='/WeddingPage' element={<WeddingPage />}></Route>
          <Route path='/Temple' element={<Temple />}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/adventurePage' element={<AdventurePage />}></Route>
        </Routes>

      </Router>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
