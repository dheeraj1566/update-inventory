import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Instance from "../AxiosConfig";

const InventoryTable = () => {
  const [inventory, setInventory] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await Instance.get("/add/getTable");
      setInventory(res.data);
      setFilter(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setLoading(false);
    }
  };

  // Filter Logic
  useEffect(() => {
    const filteredData = inventory.map((categoryData) => ({
      ...categoryData,
      items: categoryData.items.filter(
        (item) =>
          item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
          categoryData.category.toLowerCase().includes(filterQuery.toLowerCase()) ||
          item.status.toLowerCase().includes(filterQuery.toLowerCase())
      ),
    }));
    setFilter(filteredData);
  }, [filterQuery, inventory]);

  const handleDelete = async (category, itemName) => {
    try {
      const response = await Instance.delete("/add/delete-inventory", {
        data: { category, itemName },
      });
      alert(response.data.message);
      fetchData();
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      alert("Failed to delete item");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">Inventory Table</h1>

      {/* Search Filter */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by category, item name, or status"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 text-black w-full md:w-1/2"
        />
      </div>

      {loading ? (
        <p className="text-center text-black">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-black border-gray-600">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-gray-900">Serial No</th>
                <th className="border px-4 py-2 text-gray-900">Category</th>
                <th className="border px-4 py-2 text-gray-900">Item Name</th>
                <th className="border px-4 py-2 text-gray-900">Quantity</th>
                <th className="border px-4 py-2 text-gray-900">Threshold</th>
                <th className="border px-4 py-2 text-gray-900">Status</th>
                <th className="border px-4 py-2 text-gray-900">Actions</th>
                <th className="border px-4 py-2 text-gray-900">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filter.map((categoryData, categoryIndex) =>
                categoryData.items.map((item, itemIndex) => (
                  <tr key={`${categoryData._id}-${itemIndex}`} className="border">
                    <td className="border px-4 py-2 text-gray-900">
                      {categoryIndex * categoryData.items.length + itemIndex + 1}
                    </td>
                    <td className="border px-4 py-2 text-gray-900">{categoryData.category}</td>
                    <td className="border px-4 py-2 text-gray-900">{item.name}</td>
                    <td className="border px-4 py-2 text-gray-900">{item.qty}</td>
                    <td className="border px-4 py-2 text-gray-900">{item.threshold}</td>
                    <td
                      className={`border px-4 py-2 ${
                        item.status === "Available" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.status}
                    </td>
                    <td className="border text-gray-900 text-center px-4 py-2">
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                        onClick={() =>
                          navigate("/change-inventory", {
                            state: { category: categoryData.category, ...item },
                          })
                        }
                      >
                        Update
                      </button>
                    </td>
                    <td className="border text-gray-900 text-center px-4 py-2">
                      <button
                        className="bg-blue-800 text-white px-4 py-2 rounded-md"
                        onClick={() => handleDelete(categoryData.category, item.name)}
                      >
                        Delete
                      </button>
                    </td>
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

export default InventoryTable;
