import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header.jsx';
import Footer from './components/Layout/Footer.jsx';
import ScrollTop from './components/ScrollTop.jsx'; 

// Lazy load pages
const Home = lazy(() => import('./pages/Home.jsx'));
const Register = lazy(() => import('./components/Register/Register.jsx'));
const Profile = lazy(() => import('./components/Profile/Profile.jsx'));
const FindParking = lazy(() => import('./pages/FindParking.jsx'));
const HowItWork = lazy(() => import('./pages/HowItWork.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const ListSpace = lazy(() => import('./pages/ListSpace.jsx'));

const App = () => {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Header />
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Routes>
          <Route path="/Spotly" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/find-parking" element={<FindParking />} />
          <Route path="/how-it-works" element={<HowItWork />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/host" element={<ListSpace />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
