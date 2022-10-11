import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { CSVLink } from "react-csv";
import { AiOutlineDownload } from "react-icons/ai";
import { CgMore } from "react-icons/cg";

import Sidebar from "../partials/Sidebar";
import {
  coinTypeNumberToText,
  COIN_TYPES,
  truncateString,
} from "../utils/helper";
import {
  generateRedemptions,
  getRedemptionListGroupedByRound,
} from "../utils/lib/mutations";
import { RedemptionType } from "../utils/types";

const RedemptionList = () => {
  const [showGenerateRedemptionListModal, setShowGenerateRedemptionListModal] =
    useState(false);
  const [showRedemptionDetailModal, setShowRedemptionDetailModal] =
    useState(false);
  const [redemptionList, setRedemptionList] = useState<RedemptionType[]>([]);
  const [redemptionListGroupedByRound, setRedemptionListGroupedByRound] =
    useState<Record<string, RedemptionType[]>>({});
  const [selectedRedemptionList, setSelectedRedemptionList] = useState<
    RedemptionType[]
  >([]);
  const [supply, setSupply] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [coinType, setCoinType] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);

  const onTotalSupplyChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSupply(parseFloat(e.currentTarget.value));
  };

  const onMinimumValueChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMin(parseFloat(e.currentTarget.value));
  };

  const onMaximumValueChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMax(parseFloat(e.currentTarget.value));
  };

  const onCoinTypeChange = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setCoinType(parseInt(e.currentTarget.value));
  };

  const onGenerateClick = async () => {
    if (supply === 0 || min === 0 || max === 0) {
      toast.error("Please fill all the inputs");
      return;
    }

    const result = await generateRedemptions({
      supply: supply,
      coinType: coinType,
      minAmount: min,
      maxAmount: max,
    });

    if (result.status === "success") {
      setRedemptionList(result.data.redemptionList);
      toast.success(`Successfully generated ${supply} redeem codes`);
    } else {
      toast.error(result.msg);
    }
  };

  useEffect(() => {
    (async () => {
      const result = await getRedemptionListGroupedByRound();
      if (result.status === "success") {
        setRedemptionListGroupedByRound(result.data.redemptionList);
      } else {
        toast.error(result.msg);
      }
    })();
  }, []);

  return (
    <div className="flex h-[calc(100vh-65px)] overflow-hidden">
      <Sidebar />
      {/* Content area */}
      <div className="sm:px-6 w-full overflow-auto">
        <div className="my-6 lg:my-12 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300">
          <div>
            <h4 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100">
              Redemption
            </h4>
          </div>
          <div className="mt-6 md:mt-0">
            <button
              className="transition focus:outline-none duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
              onClick={() => {
                setShowGenerateRedemptionListModal(true);
              }}
            >
              Generate
            </button>
          </div>
        </div>
        <div className="container mx-auto px-6 py-10">
          <div className="xl:flex lg:flex md:flex xl:w-full md:justify-center w-11/12 mx-auto lg:justify-center xl:justify-betweens flex-wrap justify-between lg:flex-col lg:items-center xl:flex-row xl:justify-between">
            {Object.keys(redemptionListGroupedByRound).map((key) => (
              <div className="xl:w-6/12 lg:w-2/4 md:w-9/12 mb-4 xl:px-2">
                <div className="bg-white dark:bg-gray-800 shadow xl:flex lg:flex md:flex p-5 rounded">
                  <div className="xl:w-3/6 lg:w-3/6 md:w-3/6 mb-4 xl:mb-0 lg:mb-0 md:mb-0">
                    <p className="text-lg mb-3 text-gray-600 font-normal">
                      Redemption round {key}
                    </p>
                    <p className="focus:outline-none text-sm text-gray-600 dark:text-gray-400 font-normal">
                      Total Count: {redemptionListGroupedByRound[key].length}
                    </p>
                  </div>
                  <div className="xl:w-3/6 lg:w-3/6 md:w-3/6 flex justify-end flex-col xl:items-end lg:items-end md:items-end items-start">
                    <p className="focus:outline-none text-xs text-indigo-700 bg-indigo-200 px-3 rounded mb-2 font-normal py-1">
                      Created At:{" "}
                      {redemptionListGroupedByRound[key][0].createdAt}
                    </p>
                    <div className="flex items-center mt-8">
                      <CSVLink
                        className="hover:text-sky-500"
                        data={selectedRedemptionList}
                        filename={key.toString()}
                        onClick={(event, done) => {
                          setSelectedRedemptionList(
                            redemptionListGroupedByRound[key]
                          );
                          setTimeout(() => {
                            done();
                          }, 1000);
                        }}
                      >
                        <AiOutlineDownload />
                      </CSVLink>
                      <button
                        className="hover:text-sky-500 ml-1"
                        onClick={() => {
                          setSelectedRedemptionList(
                            redemptionListGroupedByRound[key]
                          );
                          setShowRedemptionDetailModal(true);
                        }}
                      >
                        <CgMore />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showRedemptionDetailModal && (
        <div className="bg-gray-700 bg-opacity-50 absolute w-full h-[calc(100vh-65px)] py-8">
          <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg flex justify-center px-2">
            <div className="relative w-600 bg-white dark:bg-gray-800 shadow px-3 md:px-6 pt-4 pb-6 rounded">
              <p className="text-base md:text-lg font-bold md:leading-none text-gray-800 dark:text-gray-100">
                Redemption Details
              </p>
              <p className="text-xs md:text-sm md:leading-5 text-gray-600 dark:text-gray-300 mt-2">
                Round: {selectedRedemptionList[0].round}
              </p>
              <div className="mt-5">
                <div className="h-52 w-full overflow-auto bg-slate-100 mt-4 p-2 rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs">
                        <th>#</th>
                        <th>Code</th>
                        <th>Amount</th>
                        <th>Redeemed</th>
                        <th>CreatedAt</th>
                        <th>RedeemedAt</th>
                        <th>UserId</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedRedemptionList.map((redemption, index) => {
                        return (
                          <tr key={redemption.code} className="text-xs">
                            <td>{(index + 1).toString()}</td>
                            <td>{redemption.code}</td>
                            <td>
                              {redemption.amount}
                              {coinTypeNumberToText(redemption.coinType)}
                            </td>
                            <td>{redemption.redeemed.toString()}</td>
                            <td>{redemption.createdAt}</td>
                            <td>{redemption.redeemedAt}</td>
                            <td>{redemption.userId}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  className="w-32 focus:outline-none py-3 bg-indigo-100 hover:bg-indigo-200 rounded"
                  onClick={() => {
                    setShowRedemptionDetailModal(false);
                  }}
                >
                  <p className="text-xs font-medium leading-3 text-indigo-700">
                    Close
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showGenerateRedemptionListModal && (
        <div className="bg-gray-700 bg-opacity-50 absolute w-full h-[calc(100vh-65px)] py-8">
          <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg flex justify-center px-2">
            <div className="relative w-600 bg-white dark:bg-gray-800 shadow px-3 md:px-6 pt-4 pb-6 rounded">
              <div className="flex items-center">
                <div>
                  <p className="text-base md:text-lg font-bold md:leading-none text-gray-800 dark:text-gray-100">
                    Redemption Code List
                  </p>
                  <p className="text-xs md:text-sm md:leading-5 text-gray-600 dark:text-gray-300 mt-2">
                    Generate Redemption Code List
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <div className="bg-gray-50 dark:bg-gray-700 border rounded dark:border-gray-700 border-gray-200">
                  <input
                    className="py-3 pl-4 bg-transparent text-sm font-medium leading-none text-gray-600 placeholder-gray-600 dark:placeholder-gray-300 dark:text-gray-300 w-full focus:outline-none"
                    type="number"
                    placeholder="Total Supply"
                    onChange={onTotalSupplyChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="mt-3 bg-gray-50 dark:bg-gray-700 border rounded dark:border-gray-700 border-gray-200">
                    <input
                      className="py-3 pl-4 bg-transparent text-sm font-medium leading-none text-gray-600 placeholder-gray-600 dark:placeholder-gray-300 dark:text-gray-300 w-full focus:outline-none"
                      type="number"
                      placeholder="Minimum Value"
                      onChange={onMinimumValueChange}
                    />
                  </div>
                  <div className="mt-3 bg-gray-50 dark:bg-gray-700 border rounded dark:border-gray-700 border-gray-200">
                    <input
                      className="py-3 pl-4 bg-transparent text-sm font-medium leading-none text-gray-600 placeholder-gray-600 dark:placeholder-gray-300 dark:text-gray-300 w-full focus:outline-none"
                      type="number"
                      placeholder="Maximum Value"
                      onChange={onMaximumValueChange}
                    />
                  </div>
                </div>
                <div className="mt-3 px-3 bg-gray-50 dark:bg-gray-700 border rounded dark:border-gray-700 border-gray-200">
                  <select
                    className="bg-transparent dark:bg-gray-700 border-none focus:outline-none py-3 w-full text-xs font-medium leading-3 text-gray-600 dark:text-gray-300"
                    onChange={onCoinTypeChange}
                  >
                    <option selected hidden>
                      Coin type
                    </option>
                    <option value={COIN_TYPES.SOL}>SOL</option>
                    <option value={COIN_TYPES.USDC}>USDC</option>
                  </select>
                </div>
              </div>
              <div className="h-52 w-full overflow-auto bg-slate-100 mt-4 p-2 rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs">
                      <th>#</th>
                      <th>Code</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  {redemptionList?.map((item, index) => {
                    return (
                      <tr key={item.code} className="text-xs">
                        <td>{(index + 1).toString()}</td>
                        <td>{truncateString(item.code, 10)}</td>
                        <td>
                          {item.amount.toString()}
                          {coinTypeNumberToText(item.coinType)}
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
              <div className="w-full flex justify-end">
                <CSVLink
                  data={redemptionList}
                  filename={"redeem"}
                  target="_blank"
                >
                  <AiOutlineDownload />
                </CSVLink>
              </div>
              <div className="flex space-x-6 items-center justify-end w-full mt-5">
                <button
                  className="w-1/2 focus:outline-none py-3 bg-indigo-100 hover:bg-indigo-200 rounded"
                  onClick={() => {
                    setShowGenerateRedemptionListModal(false);
                  }}
                >
                  <p className="text-xs font-medium leading-3 text-indigo-700">
                    Back
                  </p>
                </button>
                <button
                  className="w-1/2 focus:outline-none py-3 bg-indigo-700 hover:bg-opacity-80 dark:bg-indigo-600 rounded"
                  onClick={onGenerateClick}
                >
                  <p className="text-xs font-medium leading-3 text-gray-100">
                    Generate
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster position="bottom-center" />
    </div>
  );
};

export default RedemptionList;
