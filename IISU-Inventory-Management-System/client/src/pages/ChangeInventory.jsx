import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Instance from "../AxiosConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const ChangeInventory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, name, qty, threshold, status } = location.state || {};

  const [updatedQty, setUpdatedQty] = useState(qty);
  const [updatedThreshold, setUpdatedThreshold] = useState(threshold);
  const [updatedStatus, setUpdatedStatus] = useState(status);

  useEffect(() => {
    if (!category || !name) {
      toast.error("Invalid inventory item.");
      // navigate("/inventory-table");
    }
  }, [category, name, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await Instance.put("/add/update-inventory", {
        category,
        name,
        qty: updatedQty,
        threshold: updatedThreshold,
        status: updatedStatus,
      });

      toast.success("Inventory updated successfully!");
      // setInterval(() => {
      //   window.location.reload();
      //   navigate("/inventory-table");
      // }, 8000);
     
    } catch (error) {
      console.error("Update Inventory error:", error.response?.data || error.message);
      toast.error("Error updating inventory.");
    }
  };

  return (
    <div className="wrapper">
      <ToastContainer></ToastContainer>
      <div className="main flex items-start justify-center">
        <div className="add_inventory rounded-2xl bg-blue-100 w-3/5 m-auto my-8 px-10 py-8">
          <h1 className="text-blue-900 text-3xl font-bold text-center px-8 py-2">
            Update Inventory
          </h1>
          <form onSubmit={handleUpdate}>
            <div className="grid grid-cols-2 gap-6 px-6 py-10">
              <div className="font-bold text-blue-900">
                <label>Category</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full text-gray-500 "
                  type="text"
                  value={category}
                  disabled
                />
              </div>

              <div className="font-bold text-blue-900">
                <label>Item Name</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full text-gray-500 "
                  type="text"
                  value={name}
                  disabled
                />
              </div>

              <div className="font-bold text-blue-900">
                <label>Quantity</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full text-gray-500"
                  type="number"
                  value={updatedQty}
                  onChange={(e) => setUpdatedQty(e.target.value)}
                  required
                />
              </div>

              <div className="font-bold text-blue-900">
                <label>Threshold</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full text-gray-500"
                  type="number"
                  value={updatedThreshold}
                  onChange={(e) => setUpdatedThreshold(e.target.value)}
                  required
                />
              </div>

              <div className="font-bold text-blue-900">
                <label>Status</label>
                <select
                  className="border-2 my-2 px-5 py-2 w-full text-gray-500 "
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                  required
                >
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                className="px-8 py-3 bg-blue-900 text-white rounded-2xl mx-4"
                type="submit"
              >
                Update
              </button>
              <button
                className="px-8 py-3 bg-gray-900 text-white rounded-2xl mx-4"
                type="button"
                onClick={() => handleUpdate()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeInventory;
