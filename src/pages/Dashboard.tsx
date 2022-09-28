import Sidebar from "../partials/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-[calc(100vh-65px)]  overflow-hidden">
      <Sidebar />
      {/* Content area */}
      <div className="w-full p-4">
        <div className="w-full mt-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="pb-10">
              <div className="shadow-lg bg-sky-300 xl:p-6 p-4">
                <p className="text-1xl font-semibold text-gray-800">
                  20 SOL , 20 USDC
                </p>
                <p className="text-base leading-4 xl:mt-4 mt-2 text-gray-600">
                  Daily Deposit
                </p>
              </div>
            </div>
            <div className="pb-10">
              <div className="shadow-lg bg-sky-300 xl:p-6 p-4">
                <p className="text-1xl font-semibold text-gray-800">
                  120 SOL , 120 USDC
                </p>
                <p className="text-base leading-4 xl:mt-4 mt-2 text-gray-600">
                  Weekly Deposit
                </p>
              </div>
            </div>
            <div className="pb-10">
              <div className="shadow-lg bg-pink-300 xl:p-6 p-4">
                <p className="text-1xl font-semibold text-gray-800">
                  5 SOL , 5 USDC
                </p>
                <p className="text-base leading-4 xl:mt-4 mt-2 text-gray-600">
                  Daily Withdraw
                </p>
              </div>
            </div>
            <div className="pb-10">
              <div className="shadow-lg bg-pink-300 xl:p-6 p-4">
                <p className="text-1xl font-semibold text-gray-800">
                  30 SOL , 30 USDC
                </p>
                <p className="text-base leading-4 xl:mt-4 mt-2 text-gray-600">
                  Weekly Withdraw
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
