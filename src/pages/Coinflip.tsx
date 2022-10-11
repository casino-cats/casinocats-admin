import React from "react";
import Sidebar from "../partials/Sidebar";

const Coinflip = () => {
  return (
    <div className="flex h-[calc(100vh-65px)] overflow-hidden">
      <Sidebar />
      {/* Content area */}
      <div className="sm:px-6 w-full overflow-auto">
        <div className="my-6 lg:my-12 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300">
          <div>
            <h4 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100">
              Coinflip
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coinflip;
