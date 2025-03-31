import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Instance from "../AxiosConfig";

const Threshold = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Instance.get("/add/getTable")
      .then((res) => {
        setInventory(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center  text-black">Threshold Table</h1>

      {loading ? (
        <p className="text-center text-black">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-black border-gray-600">
            <thead>
              <tr className="">
                <th className="border px-4 py-2 text-gray-900 ">Serial No</th>
                <th className="border px-4 py-2 text-gray-900">Category</th>
                <th className="border px-4 py-2 text-gray-900">Item Name</th>
                <th className="border px-4 py-2 text-gray-900">Quantity</th>
                <th className="border px-4 py-2 text-gray-900">Threshold</th>
                <th className="border px-4 py-2 text-gray-900">Status</th>
              
              </tr>
            </thead>
            <tbody>
              {inventory.map((categoryData, categoryIndex) =>
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
                      className={`border-white px-4 py-2 ${
                        item.status === "Available" ? "text-green-600 " : "text-red-600"
                      }`}
                    >
                      {item.status}
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

export default Threshold;
