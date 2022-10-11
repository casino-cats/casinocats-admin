import { Link, useLocation } from "react-router-dom";
import {
  AiFillDashboard,
  AiTwotoneMoneyCollect,
  AiOutlineDown,
  AiOutlineUp,
  AiFillHeart,
  AiOutlineContainer,
} from "react-icons/ai";
import { FaUserAlt, FaGamepad } from "react-icons/fa";
import { BsCardList, BsCoin, BsFillOctagonFill } from "react-icons/bs";
import { RiLuggageDepositFill } from "react-icons/ri";
import { IoCashOutline } from "react-icons/io5";
import { useStoreState, useStoreActions } from "../store/hooks";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  console.log({ pathname });
  const { sideBar } = useStoreState((store) => store.pageModel);
  const { setIsGamesDropdownShowing } = useStoreActions(
    (actions) => actions.pageModel
  );
  const { setIsTransactionsDropdownShowing } = useStoreActions(
    (actions) => actions.pageModel
  );

  return (
    <aside className="w-64 h-[calc(100vh-65px)]" aria-label="Sidebar">
      <div className="h-full flex flex-col py-4 px-3 bg-gray-800">
        <div className="overflow-y-auto grow">
          <ul className="space-y-2 mt-6">
            {/* dashboard */}
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-base font-normal text-gray-50 rounded-lg hover:bg-gray-700"
              >
                <AiFillDashboard /> <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            {/* user */}
            <li>
              <Link
                to="/user"
                className="flex items-center p-2 text-base font-normal text-gray-50 rounded-lg hover:bg-gray-700"
              >
                <FaUserAlt /> <span className="ml-3">User</span>
              </Link>
            </li>
            {/* transaction */}
            <li>
              <button
                type="button"
                className="flex items-center p-2 text-base font-normal text-gray-50 rounded-lg w-full hover:bg-gray-700 transition duration-75 group"
                onClick={() => {
                  setIsTransactionsDropdownShowing(
                    !sideBar.isTransactionsDropdownShowing
                  );
                }}
              >
                <AiTwotoneMoneyCollect />
                <span className="flex-1 ml-3 text-left">Transactions</span>
                {sideBar.isTransactionsDropdownShowing ? (
                  <AiOutlineUp className="w-3 h-3" />
                ) : (
                  <AiOutlineDown className="w-3 h-3" />
                )}
              </button>
              {sideBar.isTransactionsDropdownShowing && (
                <ul className="pl-2">
                  <li>
                    <Link
                      to="/transaction/deposit"
                      className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-100 rounded-lg transition duration-75 group hover:bg-gray-700"
                    >
                      <RiLuggageDepositFill />
                      <span className="flex-1 ml-3 text-left">Deposit</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/transaction/withdraw"
                      className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-100 rounded-lg transition duration-75 group hover:bg-gray-700"
                    >
                      <IoCashOutline />
                      <span className="flex-1 ml-3 text-left">Withdraw</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            {/* games */}
            <li>
              <button
                type="button"
                className="flex items-center p-2 text-base font-normal text-gray-50 rounded-lg w-full hover:bg-gray-700 transition duration-75 group"
                onClick={() => {
                  setIsGamesDropdownShowing(!sideBar.isGamesDropdownShowing);
                }}
              >
                <FaGamepad />
                <span className="flex-1 ml-3 text-left">Games</span>
                {sideBar.isGamesDropdownShowing ? (
                  <AiOutlineUp className="w-3 h-3" />
                ) : (
                  <AiOutlineDown className="w-3 h-3" />
                )}
              </button>
              {sideBar.isGamesDropdownShowing && (
                <ul className="pl-2">
                  <li>
                    <Link
                      to="/game/coinflip"
                      className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-100 rounded-lg transition duration-75 group hover:bg-gray-700"
                    >
                      <BsCoin />
                      <span className="flex-1 ml-3 text-left">Coinflip</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/game/roulette"
                      className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-100 rounded-lg transition duration-75 group hover:bg-gray-700"
                    >
                      <BsFillOctagonFill />
                      <span className="flex-1 ml-3 text-left">Roulette</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/redemption"
                className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-100 rounded-lg transition duration-75 group hover:bg-gray-700"
              >
                <AiFillHeart />
                <span className="ml-3">Redemption</span>
              </Link>
            </li>
          </ul>
          <div className="border-b border-gray-400 w-full mt-6" />
          <h3 className="text-white text-lg mt-4">Staking</h3>
          <ul className="space-y-2 mt-4">
            {/* dashboard */}
            <li>
              <Link
                to="/pool"
                className="flex items-center p-2 text-base font-normal text-gray-50 rounded-lg hover:bg-gray-700"
              >
                <AiOutlineContainer /> <span className="ml-3">Pool</span>
              </Link>
            </li>
            <li>
              <Link
                to="/nft-list"
                className="flex items-center p-2 text-base font-normal text-gray-50 rounded-lg hover:bg-gray-700"
              >
                <BsCardList /> <span className="ml-3">NftList</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
