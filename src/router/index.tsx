import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddPool from "../pages/AddPool";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NftList from "../pages/NftList";
import Pool from "../pages/Pool";
import Transaction from "../pages/Transaction";
import { LOCAL_STORAGE_KEY } from "../utils/helper";

const Router = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuthState = async () => {
      const accessToken = await localStorage.getItem(
        LOCAL_STORAGE_KEY.AccessToken
      );
      const adminInfo = await localStorage.getItem(LOCAL_STORAGE_KEY.AdminInfo);
      console.log(JSON.parse(adminInfo!));
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
          <Route path="/transaction" element={<Transaction />} />
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
