import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";

const Pool = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
                All Orders{" "}
                <span className="text-gray-400 font-medium">442</span>
              </h2>
            </header>
            <div>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="table-auto w-full divide-y divide-gray-200">
                  {/* Table header */}
                  <thead className="text-xs uppercase text-gray-500 bg-gray-50 border-t border-gray-200">
                    <tr>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-left">Order</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-left">Date</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-left">Customer</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-left">Total</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-left">Status</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold">Items</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-left">Location</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Payment type
                        </div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <span className="sr-only">Menu</span>
                      </th>
                    </tr>
                  </thead>
                  {/* Table body */}
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
