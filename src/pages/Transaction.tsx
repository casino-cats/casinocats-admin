import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { coinTypeNumberToText } from "../utils/helper/transalator";
import { getAllTransactions } from "../utils/lib/mutations";
import { TransactionType } from "../utils/types";

const Transaction = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactionList, setTransactionList] = useState<TransactionType[]>([]);

  useEffect(() => {
    const getTransactions = async () => {
      const _transactionList = await getAllTransactions();
      if (_transactionList.status === "success") {
        setTransactionList(_transactionList.data);
        console.log(_transactionList.data);
      }
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

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                Transactions ✨
              </h1>
            </div>
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <NavLink
                to="/pool/add"
                className={`block text-gray-200 hover:text-white truncate transition duration-150  p-2 `}
              >
                <span className="btn bg-indigo-500 hover:bg-indigo-600 text-white p-2">
                  <span className="xs:block ml-2"> + Add Pool</span>
                </span>
              </NavLink>
            </div>

            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative mt-6">
              <header className="px-5 py-4">
                <h2 className="font-semibold text-gray-800">
                  All Transactions{" "}
                  <span className="text-gray-400 font-medium">
                    {transactionList?.length}
                  </span>
                </h2>
              </header>
            </div>
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-6">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="py-3 px-6">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="py-3 px-6">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="py-3 px-6">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="py-3 px-6">
                      <div className="font-semibold text-left">Actions</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactionList?.map((transaction) => (
                    <tr className="bg-white border-b" key={transaction.id}>
                      <td className="py-4 px-6">
                        {transaction.amount.toString() +
                          " " +
                          coinTypeNumberToText(transaction.coinType)}
                      </td>
                      <td className="py-y px-6">{transaction.createdAt}</td>
                      <td className="py-y px-6">{transaction.signature}</td>
                      <td className="py-y px-6">{transaction.confirmed}</td>
                      <td className="py-y px-6">{transaction.user}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Transaction;
