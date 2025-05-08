// export default InventoryTable;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Instance from "../AxiosConfig";

const PurchaseInventoryTable = () => {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);
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

  const handleDelete = async (category, itemName) => {
    try {
      const response = await Instance.delete("/add/removeInventory", {
        data: { category, itemName },
      });
      alert(response.data.message);
      fetchData();
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      alert("Failed to delete item");
    }
  };

  const uniqueCategories = [...new Set(inventory.map((category) => category.category))];

  const filteredInventory = inventory
    .filter((category) => (selectedCategory ? category.category === selectedCategory : true))
    .map((category) => {
      let letterGroups = {};
      let alphabetOrder = [];

      category.purchaseItems.forEach((item) => {
        const firstLetter = item.itemName.charAt(0).toUpperCase();
        if (!letterGroups[firstLetter]) {
          letterGroups[firstLetter] = 1;
          alphabetOrder.push(firstLetter);
        } else {
          letterGroups[firstLetter]++;
        }
      });

      return {
        ...category,
        purchaseItems: category.purchaseItems
          .filter((item) => item.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
          .filter((item) => (selectedStatus ? item.status.toLowerCase() === selectedStatus.toLowerCase() : true))
          .sort((a, b) => a.itemName.localeCompare(b.itemName)),
        letterGroups,
        alphabetOrder: alphabetOrder.sort(),
      };
    })
    .filter((category) => category.purchaseItems.length > 0 || category.category.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.category.localeCompare(b.category));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">Inventory Table</h1>
      <div className="flex flex-col md:flex-row justify-center mb-4 gap-4">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border border-gray-400 rounded-md px-4 ml-5 py-2 text-black w-full md:w-1/6">
          <option value="">All Categories</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <input type="text" placeholder="Search by item name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border border-gray-400 rounded-md px-12 py-2 text-black w-full md:w-4/6" />
        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="border border-gray-400 rounded-md px-4 py-2 text-black w-full md:w-1/6">
          <option value="">All Status</option>
          <option value="Available">Available</option>
          <option value="Available">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto mx-4">
          <table className="min-w-full border bg-blue-100 border-gray-300">
            <thead>
              <tr className="text-center bg-blue-800 text-white">
                <th className="border px-4 py-2">Serial No</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Item Name</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Threshold</th>
                <th className="border px-4 py-2">Bill No</th>
                <th className="border px-4 py-2">Party Name</th>
                <th className="border px-4 py-2">Bill Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Purchase Details</th>
              
               
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((categoryData, categoryIndex) => {
                let letterCount = {};
                return categoryData.purchaseItems.map((item) => {
                  // const firstLetter = item.name.charAt(0).toUpperCase();
                  const firstLetter = (item.ItemName?.charAt(0) || "#").toUpperCase();
                  const serialLetter = firstLetter;
                  
                  if (!letterCount[firstLetter]) {
                    letterCount[firstLetter] = 1;
                  } else {
                    letterCount[firstLetter]++;
                  }
                  const serialNumber = `${categoryIndex + 1}.${serialLetter}.${letterCount[firstLetter]}`;

                  return (
                    <tr key={`${categoryData._id}-${item.itemName}`} className="border text-center">
                      <td className="border px-4 py-2 text-black">{serialNumber}</td>
                      <td className="border px-4 py-2 text-black">{categoryData.category}</td>
                      <td className="border px-4 py-2 text-black">{item.itemName}</td>
                      <td className="border px-4 py-2 text-black">{item.qty}</td>
                      <td className="border px-4 py-2 text-black">{item.threshold}</td>
                      <td className="border px-4 py-2 text-black">{item.billNo}</td>
                      <td className="border px-4 py-2 text-black">{item.partyName}</td>
                      <td className="border px-4 py-2 text-black">{item.billDate}</td>
                      
                      <td className={`border px-4 py-2 text-black ${item.status === "Available" ? "text-green-600" : "text-red-600"}`}>{item.status}</td>
                      


                      <td className="border px-4 py-2 text-black">
                        <button className="bg-gray-700 text-white mx-2 px-5 py-2 rounded-md" onClick={() => navigate("/purchase-table", { state: { category: categoryData.category, ...item } })}>View</button>
                        
                      </td>

                
                      
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PurchaseInventoryTable;






