import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddPool from "../pages/AddPool";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NftList from "../pages/NftList";
import Pool from "../pages/Pool";
import DepositList from "../pages/DepositList";
import { LOCAL_STORAGE_KEY } from "../utils/helper";

const Router = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuthState = () => {
      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.AccessToken);
      const adminInfo = localStorage.getItem(LOCAL_STORAGE_KEY.AdminInfo);
      if (accessToken && adminInfo) {
        if (JSON.parse(adminInfo).role.includes("admin")) {
          setIsAuth(true);
        }
      }
    };
    checkAuthState();
  }, []);

  return (
    <div className="w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transaction/deposit" element={<DepositList />} />
          <Route path="/pool" element={<Pool />} />
          <Route path="/nft-list" element={<NftList />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
