import React, { Suspense, lazy } from 'react';
import './App.css';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.jsx';
import States from './components/states/States.jsx';

// Lazy-loaded components
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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong while loading the page.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <GoogleOAuthProvider clientId="990977981881-5hkqf6bqhkij2jit0pq1cge935gp37rf.apps.googleusercontent.com">
      <HashRouter>
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<div>Loading Home...</div>}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="/ref"
              element={
                <Suspense fallback={<div>Loading Ref...</div>}>
                  <Ref />
                </Suspense>
              }
            />
            <Route
              path="/signin"
              element={
                <Suspense fallback={<div>Loading Signin...</div>}>
                  <Signin />
                </Suspense>
              }
            />
            <Route
              path="/map"
              element={
                <Suspense fallback={<div>Loading Map...</div>}>
                  <MapIndia />
                </Suspense>
              }
            />
            <Route
              path="/Post"
              element={
                <Suspense fallback={<div>Loading Post...</div>}>
                  <Post />
                </Suspense>
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <Suspense fallback={<div>Loading Blog...</div>}>
                  <Blogpage />
                </Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                <Suspense fallback={<div>Loading Signup...</div>}>
                  <Signup />
                </Suspense>
              }
            />
            <Route
              path="/Make-in-India"
              element={
                <Suspense fallback={<div>Loading Make India...</div>}>
                  <MakeIndia />
                </Suspense>
              }
            />
            <Route
              path="/blogs"
              element={
                <Suspense fallback={<div>Loading Blogs...</div>}>
                  <MainBlogs />
                </Suspense>
              }
            />
            <Route
              path="/MyBusiness"
              element={
                <Suspense fallback={<div>Loading Cart...</div>}>
                  <Cartpost />
                </Suspense>
              }
            />
            <Route
              path="/orderCart"
              element={
                <Suspense fallback={<div>Loading Orders...</div>}>
                  <OrderCart />
                </Suspense>
              }
            />
            <Route
              path="/WeddingPage"
              element={
                <Suspense fallback={<div>Loading Wedding Page...</div>}>
                  <WeddingPage />
                </Suspense>
              }
            />
            <Route
              path="/Temple"
              element={
                <Suspense fallback={<div>Loading Temple...</div>}>
                  <Temple />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<div>Loading Profile...</div>}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="/adventurePage"
              element={
                <Suspense fallback={<div>Loading Adventure...</div>}>
                  <AdventurePage />
                </Suspense>
              }
            />
            <Route path="/wonders" element={<States />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ErrorBoundary>
      </HashRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
