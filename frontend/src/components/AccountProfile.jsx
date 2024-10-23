/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FiMail } from "react-icons/fi";
import { handleError, handleSuccess } from "../utils/toast";
import EditProfileModal from "./EditProfileModal"; 
import ProfileItem from "./ProfileItem";

const AccountProfile = () => {
  const [profileData, setProfileData] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "" });

  const [firstName, lastName] = profileData.name.split(" ") || ["", ""];

  const initials = lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfileData(data);
        setEditData(data);
      } catch (error) {
        handleError(error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      const updatedData = await response.json();
      setProfileData(updatedData);
      handleCloseModal();
      handleSuccess("Profile updated successfully!");
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="w-1/2 h-auto mx-auto bg-gradient-to-r from-blue-300 to-purple-300 shadow-xl rounded-lg p-6">
      <div className="flex items-center space-x-6">
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-b from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
          <span className="text-3xl font-bold text-white">{initials}</span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Profile Details</h2>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
        <ProfileItem title="Full Name" name = {profileData.name}/>
        <ProfileItem title="Full Name" icon={<FiMail/>} name = {profileData.email}/>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
          onClick={handleEditClick}
        >
          Edit Profile
        </button>
      </div>

      <EditProfileModal 
        isOpen={isEditing} 
        onClose={handleCloseModal} 
        editData={editData} 
        setEditData={setEditData} 
        onSave={handleSave} 
      />
    </div>
  );
};

export default AccountProfile;
