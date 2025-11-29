import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../components/Layout/Header.jsx';
import Footer from '../components/Layout/Footer.jsx';
import ScrollTop from '../components/ScrollTop.jsx';
import Loading from '../components/Loading.jsx';
import Error from './Error.jsx';
import Protected from './Protected.jsx';

const Home = lazy(() => import('../pages/Home.jsx'));
const Register = lazy(() => import('../pages/Register.jsx'));
const Profile = lazy(() => import('../pages/Profile.jsx'));
const FindParking = lazy(() => import('../pages/FindParking.jsx'));
const HowItWork = lazy(() => import('../pages/HowItWork.jsx'));
const About = lazy(() => import('../pages/About.jsx'));
const Contact = lazy(() => import('../pages/Contact.jsx'));
const ListSpace = lazy(() => import('../pages/ListSpace.jsx'));

const AppRoutes = () => {
  const location = useLocation();
  return (
    <>
      <ScrollTop />
      <Header />

      <Suspense fallback={<div className='min-h-screen flex justify-center items-center'><Loading /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Register />} />
          <Route path="/profile" element={<Protected><Profile /></Protected>} />
          <Route path="/find-parking" element={<FindParking />} />
          <Route path="/how-it-works" element={<HowItWork />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/list-space" element={<ListSpace />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>

      {location.pathname !== '/auth' && <Footer />}
    </>
  );
}

export default AppRoutes