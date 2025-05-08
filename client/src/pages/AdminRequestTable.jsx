import React, { useState, useEffect } from "react";
import Instance from "../AxiosConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function AdminRequestTable() {
  const [viewRequestInventory, setViewRequestInventory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchViewRequestInventory = async () => {
      try {
        const response = await Instance.get("/add/getViewRequestInventory");
        console.log("Fetched data:", response.data);
        setViewRequestInventory(response.data);
      } catch (error) {
        console.error("Error fetching request inventory:", error);
      }
    };



    fetchViewRequestInventory();
  }, []);


  const handleApprove = async (e) => {
    
    try {
      toast.success("Inventory Approved successfully!");
      setTimeout(() => {
        window.location.reload();
        navigate("/request-inventory-table");
      }, 8000);
    } catch (error) {
      console.error("Approve  Inventory error:", error.response?.data || error.message);
      toast.error("Error approving inventory.");
    }
  };



  const handleDecline = async (category, itemName) => {
    try {
      await Instance.delete(`/add/deleteRequestInventory`, {
        data: { category, itemName } // send data in the request body
      });
      toast.success("Inventory Declined successfully!");
  
      // Update state to remove the declined item
      setViewRequestInventory((prevInventory) =>
        prevInventory.map((cat) => {
          if (cat.category === category) {
            return {
              ...cat,
              requestItems: cat.requestItems.filter(
                (item) => item.itemName !== itemName
              ),
            };
          }
          return cat;
        }).filter(cat => cat.requestItems.length > 0) // Remove empty categories
      );
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      toast.error("Error declining inventory");
    }
  };
  



  // const handleDecline = async (category, itemName) => {
  //   try {
  //     toast.success("Inventory Decline successfully!");

  //   } catch (error) {
  //     console.error("Error deleting inventory item:", error);
  //     alert("Failed to delete item");
  //     toast.error("Error decline inventory")
  //   }
  // };

  console.log(viewRequestInventory);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <ToastContainer />
      <div className="wrapper">
      <div className="main flex items-start justify-center"></div>
      <div className="mt-10 text-black p-10">
        <h2 className="text-3xl font-bold text-center text-blue-900">
          View Request Inventory Table
        </h2>
        <table className="w-full border-collapse border border-blue-900 mt-4 text-black">
          <thead>
            <tr className="bg-blue-800">
              <th className="border text-white px-4 py-2">S.No</th>
              <th className="border text-white px-4 py-2">Item Name</th>
              <th className="border text-white px-4 py-2">Category</th>
              <th className="border text-white px-4 py-2">Department</th>
              <th className="border text-white px-4 py-2">Qty</th>
              <th className="border text-white px-4 py-2">Required Date</th>
              <th className="border text-white px-4 py-2">Reason</th>
              <th className="border text-white px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {viewRequestInventory.length > 0 ? (
              viewRequestInventory.map((category, categoryIndex) => {
                if (
                  !category.requestItems ||
                  !Array.isArray(category.requestItems)
                ) {
                  return null; // Skip this category if requestItems is not an array
                }
                return category.requestItems.map((item, itemIndex) => {
                  return (
                    <tr
                      key={`${categoryIndex}-${itemIndex}`}
                      className="text-center bg-blue-100 text-black"
                    >
                      <td className="border border-blue-900 px-4 py-2">
                        {categoryIndex + 1}.{itemIndex + 1}
                      </td>
                      <td className="border border-blue-900 px-4 py-2">
                        {item.itemName}
                      </td>
                      <td className="border border-blue-900 px-4 py-2">
                        {category.category}
                      </td>
                      <td className="border border-blue-900 px-4 py-2">
                        {item.requestByDept}
                      </td>
                      <td className="border border-blue-900 px-4 py-2">
                        {item.requestQty}
                      </td>
                      
                      <td className="border border-blue-900 px-4 py-2">
                        {formatDate(item.requireDate)}
                      </td>

                      <td className="border border-blue-900 px-4 py-2">
                        {item.requestReason}
                      </td>

                      <td className="border border-blue-900 px-1 py-2 ">
                      <button className="bg-green-600 text-white mx-1 px-3 py-2 rounded-md" 
                      onClick={() => handleApprove()} 
                      // onClick={() =>
                      //       navigate("/request-inventory-table", {
                      //         state: { category: category.category, ...item },
                      //       })
                      //     }
                      >
                        Approve
                      </button>

                      <button className="bg-red-600 text-white mx-1 px-3 py-2 rounded-md" 
                       onClick={() => handleDecline(category.category, item.itemName)}
                      >
                         Decline
                      </button>
                      </td>

                      
                    </tr>
                  );
                });
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No request inventory
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
}


export default AdminRequestTable;