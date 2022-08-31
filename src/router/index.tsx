import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPool from "../pages/AddPool";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NftList from "../pages/NftList";
import Pool from "../pages/Pool";

const Router = () => {
  const accessToken = localStorage.getItem("accessToken");
  return (
    <div className="w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={accessToken ? <Dashboard /> : <Login />} />
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
