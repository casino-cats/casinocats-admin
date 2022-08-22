import { PublicKey } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { BN } from "@project-serum/anchor";
import { NavLink } from "react-router-dom";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { PoolType } from "../utils/client/types/clientType";
import useClient from "../utils/hooks/useClient";

const Pool = () => {
  const client = useClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [poolList, setPoolList] = useState<PoolType[]>();
  const [selectedPool, setSelectedPool] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [depositStartDate, setDepositStartDate] = useState(new Date());
  const [depositEndDate, setDepositEndDate] = useState(new Date());
  const [stakeEndDate, setStakeEndDate] = useState(new Date());

  useEffect(() => {
    const getPoolList = async () => {
      const pools = await client?.fetchAllPool();
      setPoolList(pools);
    };
    getPoolList();
  }, [client]);

  const updatePool = async () => {
    if (selectedPool && client) {
      await client.updatePool({
        pool: new PublicKey(selectedPool),
        depositStartTs: new BN(depositStartDate.getTime() / 1000),
        depositEndTs: new BN(depositEndDate.getTime() / 1000),
        stakeEndTs: new BN(stakeEndDate.getTime() / 1000),
      });
    }
  };

  const closePool = async (poolAddress: PublicKey) => {
    await client?.closePool({ pool: poolAddress });
  };

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
                Pools ✨
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
                  All Pools{" "}
                  <span className="text-gray-400 font-medium">
                    {poolList?.length}
                  </span>
                </h2>
              </header>
              <div>
                {/* Table */}
                <div className="overflow-x-auto relative">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    {/* Table header */}
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th className="py-3 px-6">
                          <div className="font-semibold text-left">Name</div>
                        </th>
                        <th className="py-3 px-6">
                          <div className="font-semibold text-left">
                            Deposit Start Date
                          </div>
                        </th>
                        <th className="py-3 px-6">
                          <div className="font-semibold text-left">
                            Deposit End Date
                          </div>
                        </th>
                        <th className="py-3 px-6">
                          <div className="font-semibold text-left">
                            Stake End Date
                          </div>
                        </th>
                        <th className="py-3 px-6">
                          <div className="font-semibold text-left">
                            Number of Cats
                          </div>
                        </th>
                        <th className="py-3 px-6">
                          <div className="font-semibold text-left">
                            Created At
                          </div>
                        </th>
                        <th className="py-3 px-6">
                          <div className="font-semibold text-left">Actions</div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                      {poolList?.map((pool) => (
                        <tr
                          className="bg-white border-b"
                          key={pool.poolAddress}
                        >
                          <th
                            scope="row"
                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                          >
                            {pool.poolName}
                          </th>
                          <td className="py-4 px-6">
                            {new Date(
                              pool.depositStartTs * 1000
                            ).toDateString()}{" "}
                            {new Date(
                              pool.depositStartTs * 1000
                            ).toTimeString()}
                          </td>
                          <td className="py-4 px-6">
                            {new Date(pool.depositEndTs * 1000).toDateString()}{" "}
                            {new Date(pool.depositEndTs * 1000).toTimeString()}
                          </td>
                          <td className="py-4 px-6">
                            {new Date(pool.stakeEndTs * 1000).toDateString()}{" "}
                            {new Date(pool.stakeEndTs * 1000).toTimeString()}
                          </td>
                          <td className="py-4 px-6">{pool.numberOfCats}</td>
                          <td className="py-4 px-6">
                            {new Date(pool.createdAt * 1000).toDateString()}{" "}
                            {new Date(pool.createdAt * 1000).toTimeString()}
                          </td>
                          <td className="py-4 px-6">
                            <button
                              onClick={() => {
                                closePool(new PublicKey(pool.poolAddress));
                              }}
                              className=" bg-red-600 hover:bg-red-800 text-white p-1 m-1"
                            >
                              Close
                            </button>
                            <button
                              onClick={() => {
                                setSelectedPool(pool.poolAddress);
                                setDepositStartDate(
                                  new Date(pool.depositStartTs * 1000)
                                );
                                setDepositEndDate(
                                  new Date(pool.depositEndTs * 1000)
                                );
                                setStakeEndDate(
                                  new Date(pool.stakeEndTs * 1000)
                                );
                                setShowModal(true);
                              }}
                              className=" bg-red-600 hover:bg-red-800 text-white p-1 m-1"
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* update pool modal */}
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Update Pool</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <div className="grid gap-6 mb-6">
                        <div>
                          {/* deposit start date time */}
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Deposit Start Date/Time
                          </label>
                          <DateTimePicker
                            onChange={setDepositStartDate}
                            value={depositStartDate}
                          />
                        </div>
                        <div>
                          {/* deposit end date time */}
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Deposit End Date/Time
                          </label>
                          <DateTimePicker
                            onChange={setDepositEndDate}
                            value={depositEndDate}
                          />
                        </div>
                        <div>
                          {/* stake end date time */}
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Stake End Date/Time
                          </label>
                          <DateTimePicker
                            onChange={setStakeEndDate}
                            value={stakeEndDate}
                          />
                        </div>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          updatePool();
                          setShowModal(false);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default Pool;
