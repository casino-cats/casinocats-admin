import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import { CgMoreVerticalAlt } from "react-icons/cg";
import ClipboardTruncateString from "../components/ClipboardTruncateString";
import SignatureTruncate from "../components/SignatureTruncate";
import Sidebar from "../partials/Sidebar";
import {
  coinTypeNumberToText,
  SOLANA_EXPLORER_BASE_URL,
  transactionTypeNumberToText,
  truncateString,
} from "../utils/helper";
import {
  confirmTransaction,
  getAllDepositTransactions,
  getAllTransactions,
} from "../utils/lib/mutations";
import { DepositTransactionType, TransactionType } from "../utils/types";

const DepositList = () => {
  const [transactionList, setTransactionList] = useState<
    DepositTransactionType[]
  >([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType>();
  const [showTransactionDetailModal, setShowTransactionDetailModal] =
    useState(false);

  const confirm = async () => {
    if (selectedTransaction) {
      const result = await confirmTransaction({
        transactionId: selectedTransaction?.id,
      });
      console.log(result);
    }
  };

  useEffect(() => {
    const getTransactions = async () => {
      const _transactionList = await getAllDepositTransactions();
      if (_transactionList.status === "success") {
        setTransactionList(_transactionList.data.transactionList);
      }
    };
    getTransactions();
  }, []);

  return (
    <div className="flex h-[calc(100vh-65px)] overflow-hidden">
      <Sidebar />
      {/* Content area */}
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="lg:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Deposit List
            </p>
            <div className="md:flex items-center mt-6 lg:mt-0">
              <div className="flex items-center">
                <button className="px-2.5 py-2.5 mr-3 bg-indigo-700 hover:bg-indigo-600 rounded focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M15 3.3335H4.99998C4.07951 3.3335 3.33331 4.07969 3.33331 5.00016V6.66683C3.33331 7.5873 4.07951 8.3335 4.99998 8.3335H15C15.9205 8.3335 16.6666 7.5873 16.6666 6.66683V5.00016C16.6666 4.07969 15.9205 3.3335 15 3.3335Z"
                      stroke="#FAFAFA"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 11.6665H4.99998C4.07951 11.6665 3.33331 12.4127 3.33331 13.3332V14.9998C3.33331 15.9203 4.07951 16.6665 4.99998 16.6665H15C15.9205 16.6665 16.6666 15.9203 16.6666 14.9998V13.3332C16.6666 12.4127 15.9205 11.6665 15 11.6665Z"
                      stroke="#FAFAFA"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button className="px-2.5 py-2.5 mr-4 bg-white border hover:bg-gray-100 rounded border-gray-200 focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M7.49998 3.3335H4.16665C3.70641 3.3335 3.33331 3.70659 3.33331 4.16683V7.50016C3.33331 7.9604 3.70641 8.3335 4.16665 8.3335H7.49998C7.96022 8.3335 8.33331 7.9604 8.33331 7.50016V4.16683C8.33331 3.70659 7.96022 3.3335 7.49998 3.3335Z"
                      stroke="#6B7280"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.8334 3.3335H12.5C12.0398 3.3335 11.6667 3.70659 11.6667 4.16683V7.50016C11.6667 7.9604 12.0398 8.3335 12.5 8.3335H15.8334C16.2936 8.3335 16.6667 7.9604 16.6667 7.50016V4.16683C16.6667 3.70659 16.2936 3.3335 15.8334 3.3335Z"
                      stroke="#6B7280"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.49998 11.6665H4.16665C3.70641 11.6665 3.33331 12.0396 3.33331 12.4998V15.8332C3.33331 16.2934 3.70641 16.6665 4.16665 16.6665H7.49998C7.96022 16.6665 8.33331 16.2934 8.33331 15.8332V12.4998C8.33331 12.0396 7.96022 11.6665 7.49998 11.6665Z"
                      stroke="#6B7280"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.8334 11.6665H12.5C12.0398 11.6665 11.6667 12.0396 11.6667 12.4998V15.8332C11.6667 16.2934 12.0398 16.6665 12.5 16.6665H15.8334C16.2936 16.6665 16.6667 16.2934 16.6667 15.8332V12.4998C16.6667 12.0396 16.2936 11.6665 15.8334 11.6665Z"
                      stroke="#6B7280"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="flex items-center pl-3 bg-white border w-64 rounded border-gray-200">
                  <svg
                    className="text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M8.33333 13.1667C11.555 13.1667 14.1667 10.555 14.1667 7.33333C14.1667 4.11167 11.555 1.5 8.33333 1.5C5.11167 1.5 2.5 4.11167 2.5 7.33333C2.5 10.555 5.11167 13.1667 8.33333 13.1667Z"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.5 17.5L12.5 12.5"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    type="text"
                    className="py-2.5 pl-1 w-full focus:outline-none text-sm rounded text-gray-600 placeholder-gray-500"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white px-4 md:px-8 xl:px-10 overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-20 w-full text-sm leading-none text-gray-600">
                <th className="font-normal text-left pl-4">#</th>
                <th className="font-normal text-left pl-4">user</th>
                <th className="font-normal text-left pl-4">Created</th>
                <th className="font-normal text-left pl-4">Amount</th>
                <th className="font-normal text-left pl-4">Status</th>
                <th className="font-normal text-left pl-4">Actions</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {transactionList.map((transaction) => {
                return (
                  <tr
                    className="h-20 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover-bg-gray-100"
                    key={transaction.id}
                  >
                    <td className="pl-4">
                      {truncateString(transaction.id, 5)}
                    </td>
                    <td className="pl-4">
                      <div className="flex items-center">
                        <img
                          className="shadow-md rounded-full w-10 h-10 mr-3"
                          src={transaction.user.avatar}
                          alt="user avatar"
                        />
                        {truncateString(transaction.user.username, 4)}
                      </div>
                    </td>
                    <td className="pl-4">{transaction.createdAt}</td>
                    <td className="pl-4">
                      {transaction.amount +
                        " " +
                        coinTypeNumberToText(transaction.coinType)}
                    </td>
                    <td className="pl-4">
                      {transaction.approved ? (
                        <div className="w-20 h-6 flex items-center mr-16 justify-center bg-blue-50 rounded-full">
                          <p className="text-xs leading-3 text-blue-500">
                            Approved
                          </p>
                        </div>
                      ) : (
                        <div className="w-20 h-6 flex items-center mr-16 justify-center bg-yellow-50 rounded-full">
                          <p className="text-xs leading-3 text-yellow-600">
                            Pending
                          </p>
                        </div>
                      )}
                    </td>
                    <td className="pl-4">
                      <button className="bg-gray-100 mr-3 hover:bg-gray-200 py-2.5 px-5 rounded text-sm leading-3 text-gray-500 focus:outline-none">
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepositList;
