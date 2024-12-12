import { Suspense, lazy } from 'react';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Dynamically import components
const Rajastan = lazy(() => import('./components/states/Rajastan'));
const Maharashtra = lazy(() => import('./components/states/Maharasthra'));
const TamilNadu = lazy(() => import('./components/states/TamilNadu'));
const Up = lazy(() => import('./components/states/Up'));
const Mp = lazy(() => import('./components/states/Mp'));
const Kerala = lazy(() => import('./components/states/Kerala'));
const Gujarat = lazy(() => import('./components/states/Gujarat'));
const HomePage = lazy(() => import('./pages/HomePage'));
const KnowIndia = lazy(() => import('./pages/KnowIndia'));
const Post = lazy(() => import('./components/Blogging/Post'));
const Blogpage = lazy(() => import('./compounds/Blogpage'));
const Signup = lazy(() => import('./validation/Signup'));
const MakeIndia = lazy(() => import('./pages/MakeIndia'));
const MainBlogs = lazy(() => import('./compounds/MainBlogs'));
const Cartpost = lazy(() => import('./components/MeraCart/Cartpost'));
const OrderCart = lazy(() => import('./components/MeraCart/OrderCart'));
const Ref = lazy(() => import('./pages/Ref'));
const MapIndia = lazy(() => import('./components/states/MapIndia'));
const WeddingPage = lazy(() => import('./pages/WeddingPage'));
const Signin = lazy(() => import('./validation/Signin'));
const Temple = lazy(() => import('./pages/Temple.jsx'));
const AdventurePage = lazy(() => import('./pages/AdventurePage.jsx'));
const Profile = lazy(() => import('./validation/Profile.jsx'));

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="990977981881-5hkqf6bqhkij2jit0pq1cge935gp37rf.apps.googleusercontent.com">
        <Router>
          {/* Wrap all routes in Suspense */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/ref" element={<Ref />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/map" element={<MapIndia />} />
              <Route path="/Rajasthan" element={<Rajastan />} />
              <Route path="/Maharashtra" element={<Maharashtra />} />
              <Route path="/TamilNadu" element={<TamilNadu />} />
              <Route path="/Kerala" element={<Kerala />} />
              <Route path="/MadhyaPradesh" element={<Mp />} />
              <Route path="/UttarPradesh" element={<Up />} />
              <Route path="/KnowIndia" element={<KnowIndia />} />
              <Route path="/Post" element={<Post />} />
              <Route path="/blogs/:id" element={<Blogpage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/Make-in-India" element={<MakeIndia />} />
              <Route path="/blogs" element={<MainBlogs />} />
              <Route path="/MyBusiness" element={<Cartpost />} />
              <Route path="/orderCart" element={<OrderCart />} />
              <Route path="/WeddingPage" element={<WeddingPage />} />
              <Route path="/Temple" element={<Temple />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/adventurePage" element={<AdventurePage />} />
            </Routes>
          </Suspense>
        </Router>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
