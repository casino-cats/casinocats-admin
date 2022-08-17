import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <WalletMultiButton />
    </div>
  );
};

export default Dashboard;
