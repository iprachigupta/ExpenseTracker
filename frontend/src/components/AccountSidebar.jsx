// eslint-disable-next-line no-unused-vars
import React from 'react'
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import { MdManageAccounts, MdOutlineLogin } from 'react-icons/md';
import { MdPassword } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";


function AccountSidebar() {
    return (
        <div className="static">
          <div className="bg-white  w-64 p-6 shadow-xl shadow-slate-500 h-full fixed top-0 left-0">
            <Logo />
            <ul className="space-y-6 pt-4">
              <li><SidebarItem icon={<MdManageAccounts />} title="Account" route="/account" /></li>
              <li><SidebarItem icon={<MdPassword />} title="Change Password" route="/change-password" /></li>
              <li><SidebarItem icon={<TiUserDelete />} title="Delete Account" route="/delete-account" /></li>
              <li><SidebarItem icon={<MdOutlineLogin />} title="Log out" route="/logout" /></li>
            </ul>
          </div>
        </div>
      );
}

export default AccountSidebar;
