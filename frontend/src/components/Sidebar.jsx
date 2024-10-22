// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { GrTransaction } from "react-icons/gr";
import { MdManageAccounts, MdOutlineLogin, MdDashboard } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import SidebarItem from "./SidebarItem";
import Logo from "./Logo";

function Sidebar() {
  // State to control sidebar visibility
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Menu for small screens */}
      <div className="bg-white p-2 shadow-md fixed top-0 left-0 z-50 w-full flex justify-between items-center md:hidden">
        <Logo />
        <button onClick={toggleSidebar} className="text-3xl">
          <FiMenu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white w-64 p-6 shadow-xl shadow-slate-500 z-40 transform transition-transform duration-300 ease-in-out ${
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
              icon={<MdOutlineLogin />}
              title="Log out"
              route="/logout"
            />
          </li>
        </ul>
      </div>

      {/* Overlay to close sidebar when clicked outside */}
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
