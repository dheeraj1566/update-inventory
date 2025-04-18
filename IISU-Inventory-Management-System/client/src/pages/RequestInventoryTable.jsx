import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Instance from "../AxiosConfig";


const RequestInventoryTable = () => {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [selectedStatus, setSelectedStatus] = useState(""); // New state for status filter
  const [loading, setLoading] = useState(true);
  const srNoRef = useRef(1);  
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await Instance.get("/add/getTable");
      setInventory(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setLoading(false);
    }
  };

  

  // Get unique categories for dropdown
  const uniqueCategories = [
    ...new Set(inventory.map((category) => category.category)),
  ];

  // Filter and sort inventory
  const filteredInventory = inventory
    .filter((category) =>
      selectedCategory ? category.category === selectedCategory : true
    ) // Filter by selected category
    .map((category) => ({
      ...category,
      items: category.items
        .filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((item) =>
          selectedStatus ? item.status.toLowerCase() === selectedStatus.toLowerCase() : true
        ) // Filter by selected status
        .sort((a, b) => a.name.localeCompare(b.name)), // Sort items alphabetically
    }))
    .filter(
      (category) =>
        category.items.length > 0 ||
        category.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.category.localeCompare(b.category)); // Sort categories alphabetically

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">
        Inventory Table
      </h1>

      <div className="flex flex-col md:flex-row justify-center mb-4 gap-4">
        {/* Text Search Input */}
        <input
          type="text"
          placeholder="Search by item name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 text-black w-full md:w-1/4"
        />

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 text-black w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Status Dropdown */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 text-black w-full md:w-1/4"
        >
          <option value="">All Status</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Out of Stock</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-black">Serial No</th>
                <th className="border px-4 py-2 text-black">Category</th>
                <th className="border px-4 py-2 text-black">Item Name</th>
                <th className="border px-4 py-2 text-black">Quantity</th>
                <th className="border px-4 py-2 text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((categoryData, categoryIndex) =>
                categoryData.items.map((item, itemIndex) => (
                  <tr
                    key={`${categoryData._id}-${itemIndex}`}
                    className="border"
                  >
                    <td className="border px-4 py-2 text-black">
                      {srNoRef.current++}
                    </td>
                    <td className="border px-4 py-2 text-black">
                      {categoryData.category}
                    </td>
                    <td className="border px-4 py-2 text-black">{item.name}</td>
                    <td className="border px-4 py-2 text-black">{item.qty}</td>
                    <td className="border px-4 py-2 text-black"> <button
                        className="bg-blue-700 text-white px-4 py-2 rounded-md mr-2"
                        onClick={() =>
                          navigate("/request-inventory", {
                            state: { category: categoryData.category, ...item },
                          })
                        }
                      >
                        Request
                      </button></td>
                  
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestInventoryTable;
