import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";

const AddPool = () => {
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
                Add Pool ✨
              </h1>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative p-4">
            <div>
              <h2 className="text-2xl text-gray-800 font-bold mb-6">
                Input Types
              </h2>
              <div className="grid gap-5 grid-cols-3">
                <div>
                  {/* Start */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="default"
                    >
                      Default
                    </label>
                    <input
                      id="default"
                      className="border-2 border-slate-300"
                      type="text"
                    />
                  </div>
                  {/* End */}
                </div>
                <div>
                  {/* Start */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="default"
                    >
                      Default
                    </label>
                    <input
                      id="default"
                      className="border-2 border-slate-300"
                      type="text"
                    />
                  </div>
                  {/* End */}
                </div>
                <div>
                  {/* Start */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="default"
                    >
                      Default
                    </label>
                    <input
                      id="default"
                      className="border-2 border-slate-300"
                      type="text"
                    />
                  </div>
                  {/* End */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddPool;
