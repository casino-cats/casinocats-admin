import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPool from "../pages/AddPool";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NftList from "../pages/NftList";
import Pool from "../pages/Pool";

const Router = () => {
  const [accessToken, setAccessToken] = useState("");
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    walletAddress: string;
    username: string;
    solBalance: number;
    usdcBalance: number;
    cccBalance: number;
    profilePicture: string;
    role: string[];
  }>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("accessToken");
    if (access) setAccessToken(access);
    const userJson = localStorage.getItem("currentUser");
    if (userJson !== null) setCurrentUser(JSON.parse(userJson));
    if (accessToken && currentUser?.role.includes("admin"))
      setIsAuthenticated(true);
  }, [currentUser?.role]);

  return (
    <div className="w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Login />}
          />
          <Route path="/pool" element={<Pool />} />
          <Route path="/pool/add" element={<AddPool />} />
          <Route path="/nft-list" element={<NftList />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
