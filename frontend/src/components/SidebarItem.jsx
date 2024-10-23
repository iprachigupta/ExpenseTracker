/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import {NavLink} from 'react-router-dom'


export default function SidebarItem(props) {
    const {icon, route, title} = props
    return (
      <NavLink
      to={route}
      className={({ isActive }) =>
        isActive
          ? "cursor-pointer p-5 text-md bg-blue-700 text-white shadow-inherit shadow-lg rounded-2xl flex scale-110"
          : "cursor-pointer p-5  bg-blue-200 shadow-md rounded-2xl flex hover:shadow-xl hover:scale-105 hover:bg-blue-200"
      }
    >
      <span className="size-6 mt-1">{icon}</span>
      <span className="ml-2">{title}</span>
    </NavLink>
    );
  }
  