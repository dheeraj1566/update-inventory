import React, { useState, useEffect } from "react";
import Instance from "../AxiosConfig";

function PurchaseTable() {
  return (
    <div className="wrapper">
      <div className="main flex items-start justify-center"></div>
      <div className="mt-1 text-black p-10">
        <h2 className="text-3xl font-bold text-center text-blue-900">
          Purchase Details Table
        </h2>
        <br></br>
        <div className="flex justify-between items-center ">
          <p className="font-bold">Item Name : Camera Lens </p>
          <p className="font-bold">Category : Camera</p>
        </div>

        <table className="w-full border-collapse border border-blue-900 mt-4 text-black">
          <thead>
            <tr className="bg-blue-800">
              {/* <th className="border  text-white px-4 py-2"></th> */}
              <th className="border text-white px-4 py-2">S.No</th>
              <th className="border text-white px-4 py-2">Bill No</th>
              <th className="border text-white px-4 py-2">Party Name</th>
              <th className="border text-white px-4 py-2">Bill Date</th>
              <th className="border text-white px-4 py-2">Bill Amount</th>
              <th className="border text-white px-4 py-2">Purchase Qty</th>
              <th className="border text-white px-4 py-2">Current Qty</th>
              <th className="border text-white px-4 py-2">
                Price Per Unit (₹)
              </th>
              <th className="border text-white px-4 py-2">Bill</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center bg-blue-100 text-black">
              <td className="border border-blue-900 px-4 py-2">1</td>
              <td className="border border-blue-900 px-4 py-2">1.23</td>
              <td className="border border-blue-900 px-4 py-2">
                Shyam Enterprise
              </td>
              <td className="border border-blue-900 px-4 py-2">01-12-2023</td>
              <td className="border border-blue-900 px-4 py-2">1000</td>
              <td className="border border-blue-900 px-4 py-2">10</td>
              <td className="border border-blue-900 px-4 py-2">29</td>
              <td className="border border-blue-900 px-4 py-2">6</td>
              <td className="border border-blue-900 px-4 py-2">
                <button className="bg-blue-800 text-white mx-1 px-3 py-2 rounded-md">
                  <a href="#">View</a>
                </button>
              </td>
            </tr>



            <tr className="text-center bg-blue-100 text-black">
              <td className="border border-blue-900 px-4 py-2">2</td>
              <td className="border border-blue-900 px-4 py-2">1.43</td>
              <td className="border border-blue-900 px-4 py-2">
                Shyam Enterprise
              </td>
              <td className="border border-blue-900 px-4 py-2">01-10-2023</td>
              <td className="border border-blue-900 px-4 py-2">1700</td>
              <td className="border border-blue-900 px-4 py-2">90</td>
              <td className="border border-blue-900 px-4 py-2">79</td>
              <td className="border border-blue-900 px-4 py-2">6</td>
              <td className="border border-blue-900 px-4 py-2">
                <button className="bg-blue-800 text-white mx-1 px-3 py-2 rounded-md">
                  <a href="#">View</a>
                </button>
              </td>
            </tr>

            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PurchaseTable;
