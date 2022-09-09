import { Dispatch, SetStateAction, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LogoPng from "../images/logo.png";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  return (
    <div
      id="sidebar"
      ref={sidebar}
      className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 flex-shrink-0 bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-64"
      }`}
    >
      {/* Sidebar header */}
      <div className="flex justify-between mb-10 pr-3 sm:px-2">
        {/* Close button */}
        <button
          ref={trigger}
          className="lg:hidden text-gray-500 hover:text-gray-400"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
        >
          <span className="sr-only">Close sidebar</span>
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
        {/* Logo */}
        <NavLink to="/" className="block">
          <img src={LogoPng} alt="logo" width={64} height={32} />
        </NavLink>
      </div>
      {/* Links */}
      <div className="space-y-8">
        {/* GAME */}
        <div>
          <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
            <span
              className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
              aria-hidden="true"
            >
              •••
            </span>
            <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
              Pages
            </span>
          </h3>
          <ul className="mt-3">
            {/* Dashboard */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname === "/" && "bg-gray-900"
              }`}
            >
              <NavLink
                to="/"
                className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                  pathname === "/" && "hover:text-gray-200"
                }`}
              >
                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  Dashboard
                </span>
              </NavLink>
            </li>
            {/* staking pool */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname === "/pool" && "bg-gray-900"
              }`}
            >
              <NavLink
                to="/transaction"
                className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                  pathname === "/transaction" && "hover:text-gray-200"
                }`}
              >
                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  Transaction
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        {/* STAKING */}
        <div>
          <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
            <span
              className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
              aria-hidden="true"
            >
              •••
            </span>
            <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
              STAKING
            </span>
          </h3>
          <ul className="mt-3">
            {/* staking pool */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname === "/pool" && "bg-gray-900"
              }`}
            >
              <NavLink
                to="/pool"
                className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                  pathname === "/pool" && "hover:text-gray-200"
                }`}
              >
                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  pool
                </span>
              </NavLink>
            </li>
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname === "/nft-list" && "bg-gray-900"
              }`}
            >
              <NavLink
                to="/nft-list"
                className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                  pathname === "/nft-list" && "hover:text-gray-200"
                }`}
              >
                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  NftList
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
