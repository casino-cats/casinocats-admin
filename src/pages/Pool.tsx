import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";

const orders = [
  {
    id: "0",
    order: "#123567",
    date: "22/01/2021",
    customer: "Patricia Semklo",
    total: "$129.00",
    status: "Refunded",
    items: "1",
    location: "🇨🇳 Shanghai, CN",
    type: "Subscription",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "1",
    order: "#779912",
    date: "22/01/2021",
    customer: "Dominik Lamakani",
    total: "$89.00",
    status: "Approved",
    items: "2",
    location: "🇲🇽 Mexico City, MX",
    type: "Subscription",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "2",
    order: "#889924",
    date: "22/01/2021",
    customer: "Ivan Mesaros",
    total: "$89.00",
    status: "Approved",
    items: "2",
    location: "🇮🇹 Milan, IT",
    type: "One-time",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "3",
    order: "#897726",
    date: "22/01/2021",
    customer: "Maria Martinez",
    total: "$59.00",
    status: "Pending",
    items: "1",
    location: "🇮🇹 Bologna, IT",
    type: "One-time",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "4",
    order: "#123567",
    date: "22/01/2021",
    customer: "Vicky Jung",
    total: "$39.00",
    status: "Refunded",
    items: "1",
    location: "🇬🇧 London, UK",
    type: "Subscription",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "5",
    order: "#896644",
    date: "21/01/2021",
    customer: "Tisho Yanchev",
    total: "$59.00",
    status: "Approved",
    items: "1",
    location: "🇫🇷 Paris, FR",
    type: "One-time",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "6",
    order: "#136988",
    date: "21/01/2021",
    customer: "James Cameron",
    total: "$89.00",
    status: "Approved",
    items: "1",
    location: "🇫🇷 Marseille, FR",
    type: "Subscription",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "7",
    order: "#442206",
    date: "21/01/2021",
    customer: "Haruki Masuno",
    total: "$129.00",
    status: "Approved",
    items: "2",
    location: "🇺🇸 New York, USA",
    type: "Subscription",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "8",
    order: "#764321",
    date: "21/01/2021",
    customer: "Joe Huang",
    total: "$89.00",
    status: "Pending",
    items: "2",
    location: "🇨🇳 Shanghai, CN",
    type: "One-time",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "9",
    order: "#908764",
    date: "21/01/2021",
    customer: "Carolyn McNeail",
    total: "$59.00",
    status: "Refunded",
    items: "1",
    location: "🇬🇧 Sheffield, UK",
    type: "Subscription",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const Pool = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    setList(orders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
