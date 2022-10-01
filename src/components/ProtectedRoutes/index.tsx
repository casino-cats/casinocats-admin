import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../../utils/helper";

const useAuth = () => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.AccessToken);
  const adminInfo = localStorage.getItem(LOCAL_STORAGE_KEY.AdminInfo);
  if (accessToken && adminInfo) {
    if (JSON.parse(adminInfo).role.includes("admin")) {
      return true;
    }
  }
  return false;
};

const ProtectedRoutes = (props: any) => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
