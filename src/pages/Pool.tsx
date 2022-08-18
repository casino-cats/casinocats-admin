import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { PoolType } from "../utils/client/types/clientType";
import useClient from "../utils/hooks/useClient";

const Pool = () => {
  const client = useClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [poolList, setPoolList] = useState<PoolType[]>();

  useEffect(() => {
    const getPoolList = async () => {
      const pools = await client?.fetchAllPool();
      setPoolList(pools);
    };
    getPoolList();
  }, [client]);

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
          </div>

          <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
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
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody>
                    {poolList?.map((pool) => (
                      <tr className="bg-white border-b">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {pool.poolName}
                        </th>
                        <td className="py-4 px-6">
                          {new Date(pool.depositStartTs * 1000).toDateString()}{" "}
                          {new Date(pool.depositStartTs * 1000).toTimeString()}
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pool;
