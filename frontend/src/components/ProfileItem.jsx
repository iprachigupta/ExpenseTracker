/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
function ProfileItem({ title,icon,name }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-600 text-sm font-bold mb-1">
        {title}
      </label>
      <div className="flex items-center space-x-2">
        <span className="text-gray-600">{icon}</span>
        <p className="text-lg text-gray-800 font-semibold">
          {name}
        </p>
      </div>
    </div>
  );
}

export default ProfileItem;
