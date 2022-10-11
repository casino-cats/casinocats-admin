import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Sidebar from "../../partials/Sidebar";
import {
  coinTypeNumberToText,
  COIN_TYPES,
  truncateString,
} from "../../utils/helper";
import useClient from "../../utils/hooks/useClient";
import { confirmTransaction, getWithdrawList } from "../../utils/lib/mutations";
import { WithdrawTransactionType } from "../../utils/types";

const WithdrawList = () => {
  const client = useClient();
  const [withdrawList, setWithdrawList] = useState<WithdrawTransactionType[]>(
    []
  );
  const [selectedWithdraw, setSelectedWithdraw] =
    useState<WithdrawTransactionType>();
  const [showWithdrawDetailModal, setShowWithdrawDetailModal] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const handlePaginationChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const skip = (value - 1) * 10;
    const _withdrawList = await getWithdrawList({ skip: skip, take: 10 });
    if (_withdrawList.status === "success") {
      setWithdrawList(_withdrawList.data.withdrawList);
    } else {
      toast.error(_withdrawList.data.msg);
    }
  };

  const handleApprove = async () => {
    if (client && selectedWithdraw) {
      let signature;
      if (selectedWithdraw.coinType === COIN_TYPES.SOL) {
        signature = await client.withdrawSol({
          destination: selectedWithdraw.user.walletAddress,
          amount: selectedWithdraw.amount,
        });
        toast.success("Transfer success: " + signature);
      } else if (selectedWithdraw.coinType === COIN_TYPES.USDC) {
        signature = await client.withdrawUsdc({
          destination: selectedWithdraw.user.walletAddress,
          amount: selectedWithdraw.amount,
        });
        toast.success("Transfer success: " + signature);
      } else {
        toast("There is no such coin type.");
      }

      const approveResult = await confirmTransaction({
        transactionId: selectedWithdraw.id,
        signature: signature,
      });

      if (approveResult.status === "success") {
        selectedWithdraw.approved = true;
        const index = withdrawList.findIndex(
          (item) => item.id === selectedWithdraw.id
        );
        withdrawList[index].approved = true;
        withdrawList[index].approvedAt =
          approveResult.data.transaction.approvedAt;
        toast.success(approveResult.data.transaction.id + "is approved");
      } else {
        toast.error(approveResult.msg);
      }
    } else {
      toast.error(
        "Select a transaction to approve or connect the right wallet"
      );
    }
  };

  useEffect(() => {
    (async () => {
      const _withdrawList = await getWithdrawList({ skip: 0, take: 10 });
      console.log(_withdrawList);
      if (_withdrawList.status === "success") {
        setWithdrawList(_withdrawList.data.withdrawList);
        setPageCount(Math.ceil(_withdrawList.data.withdrawListLength / 10));
      }
    })();
  }, []);
  return (
    <div className="flex h-[calc(100vh-65px)] overflow-hidden">
      <Sidebar />
      {/* Withdraw content area */}
      <div className="sm:px-6 w-full overflow-auto">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="lg:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Withdraw List
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
                {withdrawList.map((item) => {
                  return (
                    <tr
                      className="h-20 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover:bg-gray-100"
                      key={item.id}
                    >
                      <td className="pl-4">{truncateString(item.id, 5)}</td>
                      <td className="pl-4">
                        <div className="flex items-center">
                          <img
                            className="shadow-md rounded-full w-10 h-10 mr-3"
                            src={item.user.avatar}
                            alt="user avatar"
                          />
                          {truncateString(item.user.username, 4)}
                        </div>
                      </td>
                      <td className="pl-4">{item.createdAt}</td>
                      <td className="pl-4">
                        {item.amount +
                          " " +
                          coinTypeNumberToText(item.coinType)}
                      </td>
                      <td className="pl-4">
                        {item.approved ? (
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
                            setSelectedWithdraw(item);
                            setShowWithdrawDetailModal(true);
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
      {showWithdrawDetailModal && (
        <div className="bg-gray-700 bg-opacity-50 absolute w-full h-[calc(100vh-65px)] py-8">
          <div className="flex items-center justify-center px-4 h-[calc(100vh-65px)] w-full relative">
            <div className="fixed overflow-y-auto w-11/12 h-[calc(100vh-65px)] py-10 max-w-lg">
              <div className="bg-white rounded-md relative">
                <div
                  onClick={() => {
                    setShowWithdrawDetailModal(false);
                  }}
                  className="absolute inset-0 m-auto w-5 h-5 mr-4 mt-4 cursor-pointer"
                ></div>
                <div className="bg-gray-100 rounded-tl-md rounded-tr-md md:px-10 px-5 pt-9 pb-2.5">
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-gray-500 mt-2">
                        {selectedWithdraw?.id}
                      </p>
                      {selectedWithdraw?.approved ? (
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
                  </div>
                  <div className="mt-2">
                    <p className="text-xs font-semibold leading-3 text-gray-800 uppercase">
                      Withdrawer
                    </p>
                    <p className="text-xs leading-4 text-gray-500 uppercase mt-1">
                      <b>ID:</b> {selectedWithdraw?.user.id}
                      <br />
                      <b>Wallet Address:</b> {selectedWithdraw?.user.username}
                      <br />
                      <b>User Name:</b> {selectedWithdraw?.user.username}
                      <br />
                      <b>Balance:</b> {selectedWithdraw?.user.solBalance} SOL |{" "}
                      {selectedWithdraw?.user.usdcBalance} USDC
                    </p>
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
                            {selectedWithdraw?.createdAt}
                          </td>
                          <td className="py-4">
                            {selectedWithdraw?.coinType &&
                              coinTypeNumberToText(selectedWithdraw?.coinType)}
                          </td>
                          <td className="py-4">{selectedWithdraw?.amount}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between mt-8">
                    <button
                      onClick={() => {
                        setShowWithdrawDetailModal(false);
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
      )}
      <Toaster position="bottom-center" />
    </div>
  );
};

export default WithdrawList;
