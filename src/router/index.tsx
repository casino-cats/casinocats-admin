import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NftList from "../pages/NftList";
import Pool from "../pages/Pool";
import DepositList from "../pages/transaction/DepositList";
import InnerContent from "../components/InnerContent";
import ProtectedRoutes from "../components/ProtectedRoutes";
import WithdrawList from "../pages/transaction/WithdrawList";
import RedemptionList from "../pages/RedemptionList";

const Router = () => {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<InnerContent />}>
            <Route path="/" element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/transaction/deposit" element={<DepositList />} />
            <Route path="/transaction/withdraw" element={<WithdrawList />} />
            <Route path="/redemption" element={<RedemptionList />} />
            <Route path="pool" element={<Pool />} />
            <Route path="nft-list" element={<NftList />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Router;
