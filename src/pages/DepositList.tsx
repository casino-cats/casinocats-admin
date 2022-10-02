import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "@mui/material/Pagination";
import Sidebar from "../partials/Sidebar";
import {
  coinTypeNumberToText,
  SOLANA_EXPLORER_BASE_URL,
  truncateString,
} from "../utils/helper";
import { confirmTransaction, getDepositList } from "../utils/lib/mutations";
import { DepositTransactionType } from "../utils/types";
import { CgClipboard } from "react-icons/cg";

const DepositList = () => {
  const [transactionList, setTransactionList] = useState<
    DepositTransactionType[]
  >([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<DepositTransactionType>();
  const [showTransactionDetailModal, setShowTransactionDetailModal] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const handlePaginationChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const skip = (value - 1) * 10;
    console.log(skip);
    const _transactionList = await getDepositList({ skip: skip, take: 10 });
    console.log(_transactionList.data);
    if (_transactionList.status === "success") {
      setTransactionList(_transactionList.data.depositList);
    } else {
      toast.error(_transactionList.data.msg);
    }
  };

  const handleApprove = async () => {
    setIsLoading(true);
    if (selectedTransaction) {
      const approveResult = await confirmTransaction({
        transactionId: selectedTransaction.id,
      });
      if (approveResult.status === "success") {
        selectedTransaction.approved = true;
        const index = transactionList.findIndex(
          (item) => item.id === selectedTransaction.id
        );
        transactionList[index].approved = true;
        transactionList[index].approvedAt =
          approveResult.data.transaction.approvedAt;
        toast.success(approveResult.data.transaction.id + "is approved");
      } else {
        toast.error(approveResult.msg);
      }
    } else {
      toast.error("Select a transaction to approve.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      const _transactionList = await getDepositList({ skip: 0, take: 10 });
      if (_transactionList.status === "success") {
        setTransactionList(_transactionList.data.depositList);
        setPageCount(Math.ceil(_transactionList.data.depositListLength / 10));
      }
    })();
  }, []);

  return (
    <div className="flex h-[calc(100vh-65px)] overflow-hidden">
      <Sidebar />
      {/* Content area */}
      <div className="sm:px-6 w-full overflow-auto">
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
        <div className="bg-white px-4 md:px-8 xl:px-10 overflow-auto">
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
                    className="h-20 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover:bg-gray-100"
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
                      <button
                        className="bg-gray-100 mr-3 hover:bg-gray-200 py-2.5 px-5 rounded text-sm leading-3 text-gray-500 focus:outline-none"
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setShowTransactionDetailModal(true);
                        }}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-2 mb-2">
          <Pagination
            count={pageCount}
            variant="outlined"
            color="secondary"
            onChange={handlePaginationChange}
          />
        </div>
      </div>
      {showTransactionDetailModal && (
        <div className="bg-gray-700 bg-opacity-50 absolute w-full h-[calc(100vh-65px)] py-8">
          <div className="flex items-center justify-center px-4 h-[calc(100vh-65px)] w-full relative">
            <div className="fixed overflow-y-auto w-11/12 h-[calc(100vh-65px)] py-10 max-w-lg">
              <div className="bg-white rounded-md relative">
                <div
                  onClick={() => {
                    setShowTransactionDetailModal(false);
                  }}
                  className="absolute inset-0 m-auto w-5 h-5 mr-4 mt-4 cursor-pointer"
                ></div>
                <div className="bg-gray-100 rounded-tl-md rounded-tr-md md:px-10 px-5 pt-9 pb-2.5">
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-gray-500 mt-2">
                        {selectedTransaction?.id}
                      </p>
                      {selectedTransaction?.approved ? (
                        <div className="w-20 h-6 flex items-center justify-center bg-blue-50 rounded-full">
                          <p className="text-xs leading-3 text-blue-500">
                            Approved
                          </p>
                        </div>
                      ) : (
                        <div className="w-20 h-6 flex items-center justify-center bg-yellow-50 rounded-full">
                          <p className="text-xs leading-3 text-yellow-600">
                            Pending
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <p className="text-xs font-semibold leading-3 text-gray-800 uppercase">
                        Depositor
                      </p>
                      <p className="text-xs leading-4 text-gray-500 uppercase mt-1">
                        <b>ID:</b> {selectedTransaction?.user.id}
                        <br />
                        <b>Wallet Address:</b>{" "}
                        {selectedTransaction?.user.username}
                        <br />
                        <b>User Name:</b> {selectedTransaction?.user.username}
                        <br />
                        <b>Balance:</b> {selectedTransaction?.user.solBalance}{" "}
                        SOL | {selectedTransaction?.user.usdcBalance} USDC
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-3.5 pb-9 px-10">
                  <div className="w-full overflow-x-auto">
                    <table className="w-full">
                      <thead className="text-xs leading-none text-gray-500 border-b border-gray-200 text-left">
                        <tr>
                          <th className="pb-2">Date/Time</th>
                          <th className="pb-2">Coin Type</th>
                          <th className="pb-2">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-xs leading-3 text-gray-800 text-left border-b border-gray-200">
                          <td className="py-4 w-1/2">
                            {selectedTransaction?.createdAt}
                          </td>
                          <td className="py-4">
                            {selectedTransaction?.coinType &&
                              coinTypeNumberToText(
                                selectedTransaction?.coinType
                              )}
                          </td>
                          <td className="py-4">
                            {selectedTransaction?.amount}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-9">
                    <div className="flex">
                      <p className="text-xs leading-4 text-gray-500 break-all">
                        {selectedTransaction?.signature}
                      </p>
                      <button
                        type="button"
                        className="inline-flex items-center text-sm mx-1 hover:text-teal-500"
                        onClick={() => {
                          window.open(
                            SOLANA_EXPLORER_BASE_URL +
                              selectedTransaction?.signature +
                              "?cluster=devnet",
                            "_blank"
                          );
                        }}
                      >
                        <CgClipboard />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-8">
                      <button
                        onClick={() => {
                          setShowTransactionDetailModal(false);
                        }}
                        className="px-6 py-3 bg-gray-400 hover:bg-gray-500 shadow rounded text-sm text-white"
                      >
                        Close
                      </button>
                      <button
                        className="px-6 py-3 bg-indigo-700 hover:bg-opacity-80 shadow rounded text-sm text-white"
                        onClick={() => {
                          handleApprove();
                        }}
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="flex items-center justify-center bg-gray-700 bg-opacity-50 absolute w-full h-[calc(100vh-65px)]">
          <svg
            aria-hidden="true"
            className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>{" "}
          Processing
        </div>
      )}
      <Toaster position="bottom-center" />
    </div>
  );
};

export default DepositList;
