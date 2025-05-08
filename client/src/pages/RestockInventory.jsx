import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Instance from "../AxiosConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles



const RestockInventory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, itemName, qty, purchaseQty,partyName, billNo, billDate, BillAmount,pricePerUnit ,bill} = location.state || {};


const [updatedPurchaseQty, setUpdatedPurchaseQty] = useState(purchaseQty);
const [updatePartyName, setUpdatedPartyName] = useState(partyName);
const [updatedBillNo, setUpdatedBillNo] = useState(billNo);
const [updatedBillDate, setUpdatedBillDate] = useState(billDate);
const [updatedBillAmount, setUpdatedBillAmount] = useState(BillAmount);
const [updatedPricePerUnit, setUpdatedPricePerUnit] = useState(pricePerUnit);
const [updatedBill, setUpdatedBill] = useState("");


  useEffect(() => {
    if (!category || !itemName) {
      toast.error("Invalid inventory item.");
      // navigate("/inventory-table");
    }
  }, [category, itemName, navigate]);

  const handleRestock = async (e) => {
    e.preventDefault();
    try {
      await Instance.put("/add/restock-inventory", {
        category,
        itemName,
        purchaseQty: updatedPurchaseQty,
        partyName: updatePartyName,
        billNo: updatedBillNo,
        billDate: updatedBillDate,
        billAmount: updatedBillAmount,
        pricePerUnit: updatedPricePerUnit,
        qty,
        bill,
       
      });

      toast.success("Inventory Restocked successfully!");
      setInterval(() => {
        window.location.reload();
        navigate("/inventory-table");
      }, 8000);
     
    } catch (error) {
      console.error("Restock Inventory error:", error.response?.data || error.message);
      toast.error("Error restocking inventory.");
    }
  };

  return (
    <div className="wrapper">
      {/* <ToastContainer /> */}
      <div className="main flex items-start justify-center">
        <div className="add_inventory rounded-2xl bg-blue-100 w-4/5 m-auto my-8 px-10 py-8">
          <h1 className="text-blue-950 text-3xl font-bold text-center px-8 py-2">
            Restocking Inventory
          </h1>
          <form onSubmit={handleRestock}>
            <div className="grid grid-cols-4 gap-8 px-6 py-10">
            <div className="font-bold text-blue-900">
                <label>Inventory Name</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full rounded-md text-gray-500 "
                  type="text"
                  placeholder="Item Name"
                  value={itemName}
                  // disabled
                />
              </div>
              <div className="font-bold text-blue-900">
                <label>Category</label>
                <input
                  type="text"
                  className="border-2 my-2 px-5 py-2 w-full rounded-md text-gray-500"
                  value={category}
                  placeholder="Selected Category"
                  // disabled
                />
                 
              </div>

              <div className="font-bold text-blue-900">
                <label>Party Name</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full text-gray-500"
                  type="text"
                  value={updatePartyName}
                  onChange={(e) => setUpdatedPartyName(e.target.value)}
                  required
                />
              </div>


              <div className="font-bold text-blue-900">
                <label>Bill No</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full text-gray-500"
                  type="number"
                  value={updatedBillNo}
                  onChange={(e) => setUpdatedBillNo(e.target.value)}
                  required
                />
              </div>

              <div className="font-bold text-blue-900">
                <label>Quantity</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full text-gray-500"
                  type="number"
                  placeholder="Current Quantity"
                  value={qty}
                  disabled
                />
              </div>

              <div className="font-bold text-blue-900">
                <label>Purchase Quantity</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full text-gray-500"
                  type="number"
                  value={updatedPurchaseQty}
                  onChange={(e) => setUpdatedPurchaseQty(e.target.value)}
                  required
                />
              </div>

              {/* <div className="font-bold text-blue-900">
                <label>Threshold</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full text-gray-500"
                  type="number"
                  value={threshold}
                  disabled
                />
              </div>

              <div className="font-bold text-blue-900">
                <label>Status</label>
                <select
                  className="border-2 my-2 px-5 py-2 w-full text-gray-500 "
                  value={status}
                  disabled
                >
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Low Stock</option>
                </select>
              </div> */}



              

<div className="font-bold text-blue-900">
                <label>Price Per Unit</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full text-gray-500"
                  type="number"
                  value={updatedPricePerUnit}
                  onChange={(e) => setUpdatedPricePerUnit(e.target.value)}
                  required
                />
              </div>

              <div className="font-bold text-blue-900">
                <label>Bill Amount</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full text-gray-500"
                  type="number"
                  value={updatedBillAmount}
                  onChange={(e) => setUpdatedBillAmount(e.target.value)}
                  required
                />
              </div>
              <div className="font-bold text-blue-900">
                <label>Bill Date</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full text-gray-500"
                  type="date"
                  value={updatedBillDate}
                  onChange={(e) => setUpdatedBillDate(e.target.value)}
                  required
                />
              </div>

              <div className="font-bold text-blue-900">
                <label>Bill Photo</label>
                <input
                  className="border-2 my-2 px-5 py-2 w-full text-gray-500"
                  type="file"
                  value={updatedBill}
                  onChange={(e) => setUpdatedBill(e.target.value)}
                  required
                />
              </div>

            </div>

            <div className="flex justify-center items-center">
              <button
                className="px-8 py-3 bg-blue-900 text-white rounded-2xl mx-4"
                type="submit"
              >
                Restock
              </button>
              <button
                className="px-8 py-3 bg-gray-900 text-white rounded-2xl mx-4"
                type="button"
                onClick={() => handleRestock()}
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
 
export default RestockInventory;
