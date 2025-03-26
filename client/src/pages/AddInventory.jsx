import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Instance from "../AxiosConfig";
import { useNavigate } from "react-router-dom";

function AddInventory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [qty, setQty] = useState("");
  const [threshold, setThreshold] = useState("");

  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Instance.get("/add/getTable");
        console.log("Fetched data:", response.data); 

        if (response.data.length > 0) {
          const uniqueCategories = [...new Set(response.data.map((cat) => cat.category))];
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
        alert("Inventory added successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Add Inventory error:", error.response?.data || error.message);
      alert("Error adding inventory");
    }
  };
  
  return (
    <div className="wrapper">
      <div className="main flex items-start justify-center">
        <div className="add_inventory rounded-2xl bg-blue-100 w-3/5 m-auto my-8 px-10 py-8">
          <h1 className="text-blue-900 text-3xl font-bold text-center px-8 py-2">
            Add Inventory
          </h1>
          <form onSubmit={handleAddInventory}>
            <div className="grid grid-cols-2 gap-6 px-6 py-10">
              <div className="font-bold">
                <label htmlFor="itemName">Inventory Name</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full"
                  type="text"
                  placeholder="Item Name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                />
              </div>

              <div className="font-bold">
                <label htmlFor="category">Category</label>
                <select
                  className="border-2 my-2 px-5 py-2 w-full text-black"
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

              <div className="font-bold">
                <label htmlFor="qty">Quantity</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full"
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  required
                />
              </div>

              <div className="font-bold">
                <label htmlFor="threshold">Threshold</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full"
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                className="px-8 py-3 bg-blue-900 text-white rounded-2xl mx-4"
                type="submit"
              >
                Submit
              </button>
              <button
                className="px-8 py-3 bg-gray-900 text-white rounded-2xl mx-4"
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
