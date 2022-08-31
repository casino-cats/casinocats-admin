import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPool from "../pages/AddPool";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NftList from "../pages/NftList";
import Pool from "../pages/Pool";

interface CurrentUserType {
  id: string;
  walletAddress: string;
  username: string;
  solBalance: number;
  usdcBalance: number;
  cccBalance: number;
  profilePicture: string;
  role: string[];
}
interface AuthInterface {
  accessToken: string | null;
  currentUser: CurrentUserType | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserType | null>>;
}

export const AuthCtx = createContext<AuthInterface | null>(null);

const Router = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null);
  const authContext = useContext(AuthCtx);
  console.log(authContext?.currentUser);

  useEffect(() => {
    console.log(authContext?.currentUser);
    if (
      authContext?.accessToken &&
      authContext.currentUser?.role.includes("admin")
    ) {
      setIsAuth(true);
    }
  }, [
    authContext?.accessToken,
    authContext?.currentUser,
    authContext?.currentUser?.role,
  ]);

  return (
    <div className="w-full h-full">
      <AuthCtx.Provider
        value={{
          accessToken: accessToken,
          currentUser: currentUser,
          setAccessToken: setAccessToken,
          setCurrentUser: setCurrentUser,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth ? <Dashboard /> : <Login />} />
            <Route path="/pool" element={<Pool />} />
            <Route path="/pool/add" element={<AddPool />} />
            <Route path="/nft-list" element={<NftList />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthCtx.Provider>
    </div>
  );
};

export default Router;
