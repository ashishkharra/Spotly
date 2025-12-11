import { userAuth } from "../store/Store";
import { Outlet, Navigate } from "react-router-dom";

const Protected = () => {
  const token = userAuth((state) => state.token);

  return token ? <Outlet /> : <Navigate to="/auth" />;
};

export default Protected;
