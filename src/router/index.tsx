import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPool from "../pages/AddPool";
import Dashboard from "../pages/Dashboard";
import NftList from "../pages/NftList";
import Pool from "../pages/Pool";

const Router = () => {
  return (
    <div className="w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pool" element={<Pool />} />
          <Route path="/pool/add" element={<AddPool />} />
          <Route path="/nft-list" element={<NftList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
