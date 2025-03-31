import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Instance from "../AxiosConfig";

const InventoryTable = () => {
  const [inventory, setInventory] = useState([]);
<<<<<<< HEAD
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); 
=======
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState("");
>>>>>>> ea4f73a63abc9fd9fe9b466d7cf479922d3939de
  const navigate = useNavigate();

  useEffect(() => {
<<<<<<< HEAD
    fetchData();
  }, []);
=======
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
      fetchInventory();
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      alert("Failed to delete item");
    }
  };
>>>>>>> eff4b7117d1397dbdb57a5a04be56db3bff708c1

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

  const filterTable = inventory.map((category) => ({...category, items: category.items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())),
    }))
    .filter((category) => category.items.length > 0 || category.category.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-6">
<<<<<<< HEAD
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
=======
      <h1 className="text-2xl font-bold mb-4 text-black">Inventory List</h1>
<<<<<<< HEAD
=======
>>>>>>> eff4b7117d1397dbdb57a5a04be56db3bff708c1

>>>>>>> ea4f73a63abc9fd9fe9b466d7cf479922d3939de
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 mb-4 w-full rounded-md text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <table className="min-w-full border border-gray-300">
            <thead>
<<<<<<< HEAD
              <tr>
                <th className="border px-4 py-2 text-gray-900">Serial No</th>
                <th className="border px-4 py-2 text-gray-900">Category</th>
                <th className="border px-4 py-2 text-gray-900">Item Name</th>
                <th className="border px-4 py-2 text-gray-900">Quantity</th>
                <th className="border px-4 py-2 text-gray-900">Threshold</th>
                <th className="border px-4 py-2 text-gray-900">Status</th>
                <th className="border px-4 py-2 text-gray-900">Actions</th>
                <th className="border px-4 py-2 text-gray-900">Delete</th>
=======
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-black">Serial No</th>
                <th className="border px-4 py-2 text-black">Category</th>
                <th className="border px-4 py-2 text-black">Item Name</th>
                <th className="border px-4 py-2 text-black">Quantity</th>
                <th className="border px-4 py-2 text-black">Threshold</th>
                <th className="border px-4 py-2 text-black">Status</th>
                <th className="border px-4 py-2 text-black">Actions</th>
>>>>>>> eff4b7117d1397dbdb57a5a04be56db3bff708c1
              </tr>
            </thead>
            <tbody>
<<<<<<< HEAD
              {filterTable.map((categoryData, categoryIndex) =>
=======
              {filter.map((categoryData, categoryIndex) =>
>>>>>>> ea4f73a63abc9fd9fe9b466d7cf479922d3939de
                categoryData.items.map((item, itemIndex) => (
                  <tr
                    key={`${categoryData._id}-${itemIndex}`}
                    className="border"
                  >
                    <td className="border px-4 py-2 text-black">
                      {categoryIndex * categoryData.items.length +
                        itemIndex +
                        1}
                    </td>
                    <td className="border px-4 py-2 text-black">
                      {categoryData.category}
                    </td>
                    <td className="border px-4 py-2 text-black">{item.name}</td>
                    <td className="border px-4 py-2 text-black">{item.qty}</td>
                    <td className="border px-4 py-2 text-black">
                      {item.threshold}
                    </td>
                    <td
                      className={`border px-4 py-2 ${
                        item.status === "Available"
                          ? "text-green-600"
                          : "text-red-600"
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
<<<<<<< HEAD
                    </td>
                    <td className="border text-gray-900 text-center px-4 py-2">
=======
>>>>>>> eff4b7117d1397dbdb57a5a04be56db3bff708c1
                      <button
                        className="bg-blue-800 text-white px-4 py-2 rounded-md"
                        onClick={() =>
                          handleDelete(categoryData.category, item.name)
                        }
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
