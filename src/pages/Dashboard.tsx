import { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import { getDashboardData } from "../utils/lib/mutations";

const Dashboard = () => {
  const [dailyDepositSolAmount, setDailyDepositSolAmount] = useState(0);
  const [dailyDepositUsdcAmount, setDailyDepositUsdcAmount] = useState(0);
  const [weeklyDepositSolAmount, setWeeklyDepositSolAmount] = useState(0);
  const [weeklyDepositUsdcAmount, setWeeklyDepositUsdcAmount] = useState(0);
  const [dailyWithdrawSolAmount, setDailyWithdrawSolAmount] = useState(0);
  const [dailyWithdrawUsdcAmount, setDailyWithdrawUsdcAmount] = useState(0);
  const [weeklyWithdrawSolAmount, setWeeklyWithdrawSolAmount] = useState(0);
  const [weeklyWithdrawUsdcAmount, setWeeklyWithdrawUsdcAmount] = useState(0);
  const [dailyDepositSolAmountToApprove, setDailyDepositSolAmountToApprove] =
    useState(0);
  const [dailyDepositUsdcAmountToApprove, setDailyDepositUsdcAmountToApprove] =
    useState(0);
  const [dailyWithdrawSolAmountToApprove, setDailyWithdrawSolAmountToApprove] =
    useState(0);
  const [
    dailyWithdrawUsdcAmountToApprove,
    setDailyWithdrawUsdcAmountToApprove,
  ] = useState(0);

  useEffect(() => {
    (async () => {
      const result = await getDashboardData();
      if (result.status === "success") {
        setDailyDepositSolAmount(
          result.data.bill.deposit.dailyDepositSolAmount
        );
        setDailyDepositUsdcAmount(
          result.data.bill.deposit.dailyDepositUsdcAmount
        );
        setWeeklyDepositSolAmount(
          result.data.bill.deposit.weeklyDepositSolAmount
        );
        setWeeklyDepositUsdcAmount(
          result.data.bill.deposit.weeklyDepositUsdcAmount
        );
        setDailyWithdrawSolAmount(
          result.data.bill.withdraw.dailyWithdrawSolAmount
        );
        setDailyWithdrawUsdcAmount(
          result.data.bill.withdraw.dailyWithdrawUsdcAmount
        );
        setWeeklyWithdrawSolAmount(
          result.data.bill.withdraw.weeklyWithdrawSolAmount
        );
        setWeeklyWithdrawUsdcAmount(
          result.data.bill.withdraw.weeklyWithdrawUsdcAmount
        );
        setDailyDepositSolAmountToApprove(
          result.data.bill.deposit.dailyDepositSolAmountToApprove
        );
        setDailyDepositUsdcAmountToApprove(
          result.data.bill.deposit.dailyDepositUsdcAmountToApprove
        );
        setDailyWithdrawSolAmountToApprove(
          result.data.bill.withdraw.dailyWithdrawSolAmountToApprove
        );
        setDailyWithdrawUsdcAmountToApprove(
          result.data.bill.withdraw.dailyWithdrawUsdcAmountToApprove
        );
      }
    })();
  }, []);
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
                  {dailyDepositSolAmount} SOL , {dailyDepositUsdcAmount} USDC{" "}
                  <span className="text-sm text-gray-600 ml-2 font-normal">
                    {dailyDepositSolAmountToApprove} SOL ,{" "}
                    {dailyDepositUsdcAmountToApprove} USDC
                  </span>
                </p>
                <p className="text-base leading-4 xl:mt-4 mt-2 text-gray-600">
                  Daily Deposit
                </p>
              </div>
            </div>
            <div className="pb-10">
              <div className="shadow-lg bg-sky-300 xl:p-6 p-4">
                <p className="text-1xl font-semibold text-gray-800">
                  {weeklyDepositSolAmount} SOL , {weeklyDepositUsdcAmount} USDC{" "}
                  <span className="text-sm text-gray-600 ml-2 font-normal">
                    {dailyWithdrawSolAmountToApprove} SOL ,{" "}
                    {dailyWithdrawUsdcAmountToApprove} USDC
                  </span>
                </p>
                <p className="text-base leading-4 xl:mt-4 mt-2 text-gray-600">
                  Weekly Deposit
                </p>
              </div>
            </div>
            <div className="pb-10">
              <div className="shadow-lg bg-pink-300 xl:p-6 p-4">
                <p className="text-1xl font-semibold text-gray-800">
                  {dailyWithdrawSolAmount} SOL , {dailyWithdrawUsdcAmount} USDC
                </p>
                <p className="text-base leading-4 xl:mt-4 mt-2 text-gray-600">
                  Daily Withdraw
                </p>
              </div>
            </div>
            <div className="pb-10">
              <div className="shadow-lg bg-pink-300 xl:p-6 p-4">
                <p className="text-1xl font-semibold text-gray-800">
                  {weeklyWithdrawSolAmount} SOL , {weeklyWithdrawUsdcAmount}{" "}
                  USDC
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
