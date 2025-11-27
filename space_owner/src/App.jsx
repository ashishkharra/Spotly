import { lazy, Suspense } from 'react';
import { userAuth } from './components/store/Store.jsx';
import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import Loading from './components/Loading/Loading.jsx';
import Auth from './pages/Auth.jsx';
import Protected from './components/protected/Protected.jsx';

const Header = lazy(() => import('./components/Layout/Header.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Space = lazy(() => import('./pages/Spaces.jsx'));
const Revenue = lazy(() => import('./pages/Revenue.jsx'));
const Analytics = lazy(() => import('./pages/Analytics.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword.jsx'));
const ContactSupport = lazy(() => import('./pages/ContactSupport.jsx'));
const StatusPage = lazy(() => import('./pages/StatusPage.jsx'))
const Error = lazy(() => import('./pages/Error.jsx'));

const ProtectedLayout = () => {
  const location = useLocation();
  return (
    <Protected>
      {location.pathname !== '/' && <Header />}
      <Outlet />
    </Protected>
  );
};

const AppContent = () => {
  const user = userAuth(state => state.user);

  return (
    <Suspense fallback={<div className='min-h-screen flex justify-center items-center'><Loading /></div>}>
      <Routes>
        {user ? (
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}

        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/spaces" element={<Space />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/support' element={<ContactSupport/>}/>
        <Route path='/status' element={<StatusPage/>}/>

        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;