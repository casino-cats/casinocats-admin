import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { getAllTransactions } from "../utils/lib/mutations";

const Transaction = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactionList, setTransactionList] = useState<any[]>([]);

  useEffect(() => {
    const getTransactions = async () => {
      const _transactionList = await getAllTransactions();
      console.log(_transactionList);
    };
    getTransactions();
  }, []);

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
