import { userAuth } from "../../store/store.jsx";
import { Outlet, Navigate } from "react-router-dom";

const Protected = () => {
  const token = userAuth((state) => state.token);

  console.log("Protected route accessed. Token:", token);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;