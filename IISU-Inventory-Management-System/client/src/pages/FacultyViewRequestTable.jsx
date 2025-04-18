import React, { useState, useEffect } from "react";


function FacultyViewRequestTable() {
  return (
    <div className="wrapper">
  <div className="main flex items-start justify-center"></div>
  <div className="mt-10 text-black p-10">
    <h2 className="text-3xl font-bold text-center text-blue-900">
       View Requested Inventory Table
    </h2>
   

    <table className="w-full border-collapse border border-blue-900 mt-4 text-black">
      <thead>
        <tr className="bg-blue-800">
          <th className="border text-white px-4 py-2">S.No</th>
          <th className="border text-white px-4 py-2">Item Name</th>
          <th className="border text-white px-4 py-2">Category</th>
          <th className="border text-white px-4 py-2">Qty</th>
          <th className="border text-white px-4 py-2">Requested By</th>
          <th className="border text-white px-4 py-2">Requested Date</th>
          <th className="border text-white px-4 py-2">Required Date</th>
          <th className="border text-white px-4 py-2">Status</th>

        </tr>
      </thead>
      <tbody>
        <tr className="text-center bg-blue-100 text-black">
          <td className="border border-blue-900 px-4 py-2">
            1
          </td>
          <td className="border border-blue-900 px-4 py-2">
            1.23
          </td>
          <td className="border border-blue-900 px-4 py-2">
            Electronics 
          </td>
          <td className="border border-blue-900 px-4 py-2">
           29
          </td>

          <td className="border border-blue-900 px-4 py-2">
           Amita Sharma
          </td>
          <td className="border border-blue-900 px-4 py-2">
           23/03/2023
          </td>

          <td className="border border-blue-900 px-4 py-2">
           28/03/2023
          </td>
            <td className="border border-blue-900 px-4 py-2">
             <button className="bg-yellow-500 text-white mx-1 px-3 py-2 rounded-md"><a href="#">Pending</a></button>   
                </td>

        </tr>

        <tr>
         
        </tr>
      </tbody>
    </table>
  </div>
  </div>
);
}

export default FacultyViewRequestTable;
