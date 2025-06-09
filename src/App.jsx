import React, { Suspense, lazy } from 'react';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import ErrorPage from './pages/ErrorPage.jsx';
import States from './components/states/States.jsx';

// Dynamically import components
const HomePage = lazy(() => import('./pages/HomePage'));
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


class ErrorBoundary extends React.Component{
  constructor(props){
    super(props);
    this.state = {hasError:false};
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render(){
    if(this.state.hasError){
      return <h1>Something went wrong while loading the page.</h1>
    }

  return this.props.children;
  }
}

function App() {
  return (
      <GoogleOAuthProvider clientId="990977981881-5hkqf6bqhkij2jit0pq1cge935gp37rf.apps.googleusercontent.com">
        <Router>
          <ErrorBoundary>
          {/* Wrap all routes in Suspense */}

            <Routes>
              <Route path="/ref" element={<Ref />} />
              <Suspense fallback={<div>Loading...</div>}>
                <Route path="/" element={<HomePage />} />
              </Suspense>
              <Route path="/signin" element={<Signin />} />
              <Route path="/map" element={<MapIndia />} />
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
              <Route path ="*" element={<ErrorPage/>} />
              <Route path="/wonders" element={<States/>}/>
            </Routes>
        </ErrorBoundary>
        </Router>
      </GoogleOAuthProvider>
  );
}

export default App;
