/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { GrTransaction } from "react-icons/gr";
import { MdManageAccounts, MdOutlineLogin, MdDashboard } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import SidebarItem from "./SidebarItem";
import Logo from "./Logo";
import { useLogout } from "../contexts/LogoutContext";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { triggerLogoutDialog } = useLogout();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed">
      <div className="bg-white p-2 shadow-md fixed top-0 left-0 z-50 w-full flex justify-between items-center md:hidden">
        <Logo />
        <button onClick={toggleSidebar} className="text-3xl">
          <FiMenu />
        </button>
      </div>

      <div
        className={`top-0 left-0 h-screen bg-white w-64 p-6 shadow-xl shadow-slate-500 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <Logo />
        <ul className="space-y-6 pt-4">
          <li>
            <SidebarItem
              icon={<MdDashboard />}
              title="Dashboard"
              route="/dashboard"
            />
          </li>
          <li>
            <SidebarItem
              icon={<GrTransaction />}
              title="Transactions"
              route="/transactions"
            />
          </li>

          <li>
            <SidebarItem
              icon={<MdManageAccounts />}
              title="Account"
              route="/account"
            />
          </li>
          <li>
            <SidebarItem
              icon={<MdOutlineSettings />}
              title="Settings"
              route="/settings"
            />
          </li>
          <li>
            <div
              className="cursor-pointer p-5  bg-blue-200 shadow-md rounded-2xl flex hover:shadow-xl hover:scale-105 hover:bg-blue-200"
              onClick={triggerLogoutDialog}
            >
              <span className="size-6 mt-1">{<MdOutlineLogin />}</span>
              <span className="ml-2">Log Out</span>
            </div>
          </li>
        </ul>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default Sidebar;
