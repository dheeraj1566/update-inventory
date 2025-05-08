/* This code snippet is a React component named `AddInventory` that allows users to add new inventory
items.*/

import React, { useState, useEffect } from "react";
import Instance from "../AxiosConfig";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddInventory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [qty, setQty] = useState("");
  const [threshold, setThreshold] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Instance.get("/add/getTable");
        console.log("Fetched data:", response.data);

        if (response.data.length > 0) {
          const uniqueCategories = [
            ...new Set(response.data.map((cat) => cat.category)),
          ];
          setCategories(uniqueCategories);
          setSelectedCategory(uniqueCategories[0] || "");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddInventory = async (e) => {
    e.preventDefault();
    try {
      const response = await Instance.post("/add/inventory", {
        category: selectedCategory,
        name: itemName,
        qty: parseInt(qty, 10),
        threshold: parseInt(threshold, 10),
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("Inventory added successfully!");
        setInterval(() => {
          navigate("/inventory-table");
        }, 8000);
      }
    } catch (error) {
      console.error(
        "Add Inventory error:",
        error.response?.data || error.message
      );
      toast.error("Error adding inventory");
    }
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <div className="main flex items-start justify-center">
        <div className="add_inventory rounded-2xl bg-blue-100 border-blue-950 w-4/6 m-auto my-8 px-10 py-8 shadow-[10px_10px_30px_rgba(0,0,0,0.3)]">
          <h1 className="text-blue-950  text-3xl font-bold text-center px-8 py-2">
            Add Inventory
          </h1>
          <form onSubmit={handleAddInventory}>
            <div className="grid grid-cols-2 gap-6 px-6 py-10">
              <div className="font-bold text-blue-900">
                <label htmlFor="itemName text-blue-900">Inventory Name</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full rounded-md  text-gray-500"
                  type="text"
                  placeholder="Item Name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                />
              </div>

              <div className="font-bold text-blue-900">
                <label htmlFor="category text-blue-900">Category</label>
                <select
                  className="border-2  text-gray-500 my-2 px-5 py-2 w-full rounded-md "
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="font-bold text-blue-900">
                <label htmlFor="qty text-blue-900">Quantity</label>
                <input
                  className="border-2  text-gray-500 my-2 px-5 py-2  rounded-md w-full"
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  required
                />
              </div>

              <div className="font-bold text-blue-900">
                <label htmlFor="threshold text-blue-900">Threshold</label>
                <input
                  className="border-2 my-2  text-gray-500 px-5 py-2 rounded-md w-full"
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-center  text-blue-900 items-center">
              <button
                className="px-8 py-3 bg-blue-900 text-white rounded-lg mx-8"
                type="submit"
              >
                Submit
              </button>
              <button
                className="px-8 py-3 bg-gray-900 text-white rounded-lg mx-8"
                type="reset"
                onClick={() => {
                  setItemName("");
                  setQty("");
                  setThreshold("");
                  setSelectedCategory(categories[0] || "");
                }}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddInventory;
