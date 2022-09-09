import React, { useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";

const Transaction = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-auto">
        <Header />
      </div>
    </div>
  );
};

export default Transaction;
