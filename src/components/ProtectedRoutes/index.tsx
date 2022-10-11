import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStoreState } from "../../store/hooks";

const useAuth = () => {
  const { isAdmin } = useStoreState((store) => store.userModel);
  return isAdmin;
};

const ProtectedRoutes = (props: any) => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
