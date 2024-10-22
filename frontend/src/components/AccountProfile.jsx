/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { FiMail } from "react-icons/fi"; 

const AccountProfile = ({ userId }) => {
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "" });
  console.log(userId)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/${userId}`);
        const { name, email } = response.data;

        const nameParts = name.split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

        setUser({ firstName, lastName, email });
        // console.log(user)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div className="w-1/2 h-auto mx-auto bg-gradient-to-r from-blue-300 to-purple-300 shadow-xl rounded-lg p-6">
      <div className="flex items-center space-x-6">
        {/* Avatar */}
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-b from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
          <span className="text-3xl font-bold text-white">
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </span>
        </div>

        {/* User Info */}
        <div>
          <h2 className="text-2xl font-bold text-white">Profile Details</h2>
        </div>
      </div>

      {/* Labels and User Information */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
        {/* First Name */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-bold mb-1">First Name</label>
          <p className="text-lg text-gray-800 font-semibold">{user.firstName}</p>
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-bold mb-1">Last Name</label>
          <p className="text-lg text-gray-800 font-semibold">{user.lastName}</p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-bold mb-1">Email</label>
          <div className="flex items-center space-x-2">
            <FiMail className="text-gray-600" /> {/* Mail Icon */}
            <p className="text-lg text-gray-800 font-semibold">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Additional Information or Links */}
      <div className="mt-6 flex justify-center">
        <button className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default AccountProfile;
