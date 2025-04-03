// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Instance from "../AxiosConfig";

// const InventoryTable = () => {
//   const [inventory, setInventory] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const serialNumber = useRef(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const res = await Instance.get("/add/getTable");
//       setInventory(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching inventory:", error);
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (category, itemName) => {
//     try {
//       const response = await Instance.delete("/add/removeInventory", {
//         data: { category, itemName },
//       });
//       alert(response.data.message);
//       fetchData();
//     } catch (error) {
//       console.error("Error deleting inventory item:", error);
//       alert("Failed to delete item");
//     }
//   };
//   const filteredInventory = inventory
//     .map((category) => ({
//       ...category,
//       items: category.items.filter((item) =>
//         item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       ),
//     }))
//     .filter(
//       (category) =>
//         category.items.length > 0 ||
//         category.category.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4 text-center text-black">
//         Inventory Table
//       </h1>

//       <div className="flex justify-center mb-4">
//         <input
//           type="text"
//           placeholder="Search by category, item name, or status"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="border border-gray-400 rounded-md px-4 py-2 text-black w-full md:w-1/2"

//         />

//         {/* Category Dropdown */}
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="border border-gray-400 rounded-md px-4 py-2 text-black w-full md:w-1/4"
//         >
//           <option value="">All Categories</option>
//           {uniqueCategories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>

//         {/* Status Dropdown */}
//         <select
//           value={selectedStatus}
//           onChange={(e) => setSelectedStatus(e.target.value)}
//           className="border border-gray-400 rounded-md px-4 py-2 text-black w-full md:w-1/4"
//         >
//           <option value="">All Status</option>
//           <option value="Available">Available</option>
//           <option value="Unavailable">Out of Stock</option>
//         </select>
//       </div>

//       {loading ? (
//         <p className="text-center">Loading...</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border px-4 py-2 text-black">Serial No</th>
//                 <th className="border px-4 py-2 text-black">Category</th>
//                 <th className="border px-4 py-2 text-black">Item Name</th>
//                 <th className="border px-4 py-2 text-black">Quantity</th>
//                 <th className="border px-4 py-2 text-black">Threshold</th>
//                 <th className="border px-4 py-2 text-black">Status</th>
//                 <th className="border px-4 py-2 text-black">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredInventory.map((categoryData, categoryIndex) =>
//                 categoryData.items.map((item, itemIndex) => (
//                   <tr
//                     key={`${categoryData._id}-${itemIndex}`}
//                     className="border"
//                   >
//                     <td className="border px-4 py-2 text-black">
//                       {serialNumber.current++}
//                     </td>
//                     <td className="border px-4 py-2 text-black">
//                       {categoryData.category}
//                     </td>
//                     <td className="border px-4 py-2 text-black">{item.name}</td>
//                     <td className="border px-4 py-2 text-black">{item.qty}</td>
//                     <td className="border px-4 py-2 text-black">
//                       {item.threshold}
//                     </td>
//                     <td
//                       className={`border px-4 py-2 ${
//                         item.status === "Available"
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {item.status}
//                     </td>
//                     <td className="border px-4 py-2">
//                       <button
//                         className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
//                         onClick={() =>
//                           navigate("/change-inventory", {
//                             state: { category: categoryData.category, ...item },
//                           })
//                         }
//                       >
//                         Update
//                       </button>
//                       <button
//                         className="bg-blue-800 text-white px-4 py-2 rounded-md"
//                         onClick={() =>
//                           handleDelete(categoryData.category, item.name)
//                         }
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InventoryTable;


import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Instance from "../AxiosConfig";

const InventoryTable = () => {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Instance.get("/add/getTable");
        setInventory(res.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (category, itemName) => {
    try {
      const response = await Instance.delete("/add/removeInventory", {
        data: { category, itemName },
      });
      alert(response.data.message);
      setInventory((prev) =>
        prev.map((cat) =>
          cat.category === category
            ? { ...cat, items: cat.items.filter((item) => item.name !== itemName) }
            : cat
        )
      );
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      alert("Failed to delete item");
    }
  };

  const uniqueCategories = useMemo(
    () => [...new Set(inventory.map((cat) => cat.category))],
    [inventory]
  );

  const filteredInventory = useMemo(() => {
    return inventory
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (!selectedStatus || item.status === selectedStatus)
        ),
      }))
      .filter(
        (category) =>
          category.items.length > 0 ||
          category.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [inventory, searchQuery, selectedStatus]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">
        Inventory Table
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by category, item name, or status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 text-black w-full md:w-1/3"
        />

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
                {["Serial No", "Category", "Item Name", "Quantity", "Threshold", "Status", "Actions"].map((header) => (
                  <th key={header} className="border px-4 py-2 text-black">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((categoryData, categoryIndex) =>
                categoryData.items.map((item, itemIndex) => (
                  <tr key={`${categoryData._id}-${itemIndex}`} className="border">
                    <td className="border px-4 py-2 text-black">{categoryIndex + 1}.{itemIndex + 1}</td>
                    <td className="border px-4 py-2 text-black">{categoryData.category}</td>
                    <td className="border px-4 py-2 text-black">{item.name}</td>
                    <td className="border px-4 py-2 text-black">{item.qty}</td>
                    <td className="border px-4 py-2 text-black">{item.threshold}</td>
                    <td className={`border px-4 py-2 ${item.status === "Available" ? "text-green-600" : "text-red-600"}`}>
                      {item.status}
                    </td>
                    <td className="border px-4 py-2 flex gap-2">
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
