import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { BN } from "@project-serum/anchor";
import Sidebar from "../partials/Sidebar";
import useClient from "../utils/hooks/useClient";

const AddPool = () => {
  const client = useClient();

  const [poolName, setPoolName] = useState("");
  const [depositStartDate, onDepositStartDateChange] = useState(new Date());
  const [depositEndDate, onDepositEndDateChange] = useState(new Date());
  const [stakeEndDate, onStakeEndDateChange] = useState(new Date());

  const onPoolNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPoolName(e.currentTarget.value);
  };

  const initPool = async () => {
    await client?.initPool({
      poolName,
      depositStartTs: new BN(depositStartDate.getTime() / 1000),
      depositEndTs: new BN(depositEndDate.getTime() / 1000),
      stakeEndTs: new BN(stakeEndDate.getTime() / 1000),
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 p-4 overflow-y-auto overflow-x-auto">
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                Add Pool ✨
              </h1>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative p-4">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                {/* pool name */}
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="pool_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="2022-08 2nd Week "
                  value={poolName}
                  onChange={onPoolNameChange}
                />
              </div>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-3">
              <div>
                {/* deposit start date */}
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Deposit start date
                </label>
                <DateTimePicker
                  format="y-MM-dd HH:mm"
                  onChange={onDepositStartDateChange}
                  value={depositStartDate}
                />
              </div>
              <div>
                {/* deposit start date */}
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Deposit End date
                </label>
                <DateTimePicker
                  format="y-MM-dd HH:mm"
                  onChange={onDepositEndDateChange}
                  value={depositEndDate}
                />
              </div>
              <div>
                {/* deposit start date */}
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Stake End date
                </label>
                <DateTimePicker
                  format="y-MM-dd HH:mm"
                  onChange={onStakeEndDateChange}
                  value={stakeEndDate}
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => initPool()}
              >
                Add
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddPool;
