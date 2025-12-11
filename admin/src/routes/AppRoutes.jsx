import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import SignIn from '../pages/SignIn.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Protected from '../components/ui/Protected.jsx';
import { userAuth } from "../store/store.jsx";

function AppRoutes() {
  const user = userAuth((state) => state);
  console.log("AppRoutes - Current User State:", user);
  return (
    <Router>
      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<SignIn />} />

        {/* Layout should wrap ONLY protected pages */}
        <Route element={<Protected />}>
          <Route element={<Layout user={user} />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
