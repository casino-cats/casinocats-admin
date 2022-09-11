import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import { CgMoreVerticalAlt } from "react-icons/cg";
import ClipboardTruncateString from "../components/ClipboardTruncateString";
import SignatureTruncate from "../components/SignatureTruncate";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import {
  coinTypeNumberToText,
  SOLANA_EXPLORER_BASE_URL,
  transactionTypeNumberToText,
} from "../utils/helper";
import { getAllTransactions } from "../utils/lib/mutations";
import { TransactionType } from "../utils/types";

const Transaction = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactionList, setTransactionList] = useState<TransactionType[]>([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType>();
  const [showTransactionDetailModal, setShowTransactionDetailModal] =
    useState(false);

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
            {/* <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <NavLink
                to="/pool/add"
                className={`block text-gray-200 hover:text-white truncate transition duration-150  p-2 `}
              >
                <span className="btn bg-indigo-500 hover:bg-indigo-600 text-white p-2">
                  <span className="xs:block ml-2"> + Add Pool</span>
                </span>
              </NavLink>
            </div> */}

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
                      <div className="font-semibold text-left">ID</div>
                    </th>
                    <th className="py-3 px-6">
                      <div className="font-semibold text-left">User</div>
                    </th>
                    <th className="py-3 px-6">
                      <div className="font-semibold text-left">Amount</div>
                    </th>
                    <th className="py-3 px-6">
                      <div className="font-semibold text-left">Created At</div>
                    </th>
                    <th className="py-3 px-6">
                      <div className="font-semibold text-left">Signature</div>
                    </th>
                    <th className="py-3 px-6">
                      <div className="font-semibold text-left">Confirmed</div>
                    </th>
                    <th className="py-3 px-6">
                      <div className="font-semibold text-left">Type</div>
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
                        <ClipboardTruncateString original={transaction.id} />
                      </td>
                      <td className="py-4 px-6">
                        <ClipboardTruncateString original={transaction.user} />
                      </td>
                      <td className="py-4 px-6">
                        {transaction.amount +
                          " " +
                          coinTypeNumberToText(transaction.coinType)}
                      </td>
                      <td className="py-4 px-6">{transaction.createdAt}</td>
                      <td className="py-4 px-6">
                        <SignatureTruncate tx={transaction.signature} />
                      </td>
                      <td className="py-4 px-6">
                        {transaction.confirmed.toString()}
                      </td>
                      <td className="py-4 px-6">
                        {transactionTypeNumberToText(transaction.type)}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          className="bg-sky-600 hover:bg-sky-800 text-white p-1 m-1"
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setShowTransactionDetailModal(true);
                          }}
                        >
                          <CgMoreVerticalAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {showTransactionDetailModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-5xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h4 className="text-xl font-semibold">
                        Transaction Detail
                      </h4>
                    </div>
                    {/* body */}
                    <div className="relative p-6 flex-auto">
                      <div className="grid gap-6 mb-6">
                        <div>
                          {/* pool name */}
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Transaction ID
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedTransaction?.id}
                          />
                        </div>
                      </div>
                      <div className="grid gap-6 mb-6 md:grid-cols-4">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            User
                          </label>
                          <label className="block mb-2 text-xs text-gray-700">
                            {selectedTransaction?.user}
                          </label>
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Amount
                          </label>
                          <label className="block mb-2 text-xs text-gray-700">
                            {selectedTransaction?.amount +
                              " " +
                              coinTypeNumberToText(
                                selectedTransaction!.coinType
                              )}
                          </label>
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Created At
                          </label>
                          <label className="block mb-2 text-xs text-gray-700">
                            {selectedTransaction?.createdAt}
                          </label>
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Confirmed
                          </label>
                          <label className="block mb-2 text-xs text-gray-700">
                            {selectedTransaction?.confirmed.toString()}
                          </label>
                        </div>
                      </div>
                      <div>
                        {/* pool name */}
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Signature
                        </label>
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={selectedTransaction?.id}
                        />
                        <iframe
                          src={
                            SOLANA_EXPLORER_BASE_URL +
                            selectedTransaction?.signature +
                            "?cluster=devnet"
                          }
                          className="p-4 w-full h-72"
                          title="solana explorer"
                        />
                      </div>
                    </div>
                    {/* footer */}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowTransactionDetailModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default Transaction;
