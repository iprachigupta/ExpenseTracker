/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const EditProfileModal = ({
  isOpen,
  onClose,
  editData,
  setEditData,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-xs md:max-w-md lg:max-w-lg">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Edit Profile</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-lg"
            value={editData.email}
            onChange={(e) =>
              setEditData({ ...editData, email: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={onSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;