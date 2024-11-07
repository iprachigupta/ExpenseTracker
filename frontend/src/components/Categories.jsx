/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { handleSuccess, handleError } from "../utils/toast";

function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", type: "income" });
  const [isEditing, setIsEditing] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/categories", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) setCategories(data);
    } catch (error) {
      handleError("Failed to load categories");
    }
  };

  const handleAddOrEditCategory = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:8080/api/categories/${editCategoryId}`
      : "http://localhost:8080/api/categories";

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        fetchCategories();
        setNewCategory({ name: "", type: "income" });
        setIsEditing(false);
        setEditCategoryId(null);
      } else handleError(result.message);
    } catch (error) {
      handleError("Failed to save category");
    }
  };

  const handleEditClick = (category) => {
    setIsEditing(true);
    setEditCategoryId(category._id);
    setNewCategory({ name: category.name, type: category.type });
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/categories/${categoryId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        fetchCategories();
      } else handleError(result.message);
    } catch (error) {
      handleError("Failed to delete category");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Manage Categories
      </h2>
      <form onSubmit={handleAddOrEditCategory} className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={newCategory.type}
          onChange={(e) =>
            setNewCategory({ ...newCategory, type: e.target.value })
          }
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-md hover:shadow-lg transition-shadow duration-200"
        >
          {isEditing ? "Update" : "Add"} Category
        </button>
      </form>

      <ul className="space-y-3">
        {categories.map((category) => (
          <li
            key={category._id}
            className="flex justify-between items-center p-3 bg-gray-100 rounded-md shadow-sm"
          >
            <div>
              <span className="font-medium text-gray-800">{category.name}</span>
              <span className="text-gray-500 ml-1">({category.type})</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditClick(category)}
                className="px-3 py-1 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-md hover:shadow-lg hover:from-blue-600 hover:to-teal-600 transition-transform duration-200 transform hover:scale-105"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCategory(category._id)}
                className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-md hover:shadow-lg hover:from-red-600 hover:to-pink-700 transition-transform duration-200 transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageCategory;
