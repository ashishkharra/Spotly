import { Navigate } from 'react-router-dom';
import { userAuth } from '../store/Store';

const Protected = ({ children }) => {
  const user = userAuth(state => state.user);

  if (!user) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default Protected;