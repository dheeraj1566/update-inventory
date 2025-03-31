import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Instance from "../AxiosConfig";

const InventoryTable = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = () => {
    Instance.get("/add/getTable")
      .then((res) => {
        setInventory(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
        setLoading(false);
      });
  };

  const handleDelete = async (category, itemName) => {
    try {
      const response = await Instance.delete("/add/removeInventory", {
        data: { category, itemName },
      });
      alert(response.data.message);
      fetchInventory(); // Refresh inventory after deletion
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      alert("Failed to delete item");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-black">Inventory List</h1>

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
                <th className="border px-4 py-2 text-black">Threshold</th>
                <th className="border px-4 py-2 text-black">Status</th>
                <th className="border px-4 py-2 text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((categoryData, categoryIndex) =>
                categoryData.items.map((item, itemIndex) => (
                  <tr key={`${categoryData._id}-${itemIndex}`} className="border">
                    <td className="border px-4 py-2 text-black">
                      {categoryIndex * categoryData.items.length + itemIndex + 1}
                    </td>
                    <td className="border px-4 py-2 text-black">{categoryData.category}</td>
                    <td className="border px-4 py-2 text-black">{item.name}</td>
                    <td className="border px-4 py-2 text-black">{item.qty}</td>
                    <td className="border px-4 py-2 text-black">{item.threshold}</td>
                    <td
                      className={`border px-4 py-2 ${
                        item.status === "Available" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.status}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                        onClick={() =>
                          navigate("/change-inventory", {
                            state: { category: categoryData.category, ...item },
                          })
                        }
                      >
                        Update
                      </button>
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