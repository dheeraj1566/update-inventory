import React from 'react'

function AdminRequestTable() {
  return (
    <div>
      
      <div className="wrapper">
  <div className="main flex items-start justify-center"></div>
  <div className="mt-10 text-black p-10">
    <h2 className="text-3xl font-bold text-center text-blue-900">
       Requested Inventory Table
    </h2>
   

    <table className="w-full border-collapse border border-blue-900 mt-4 text-black">
      <thead>
        <tr className="bg-blue-800">
          <th className="border text-white px-4 py-2">S.No</th>
          <th className="border text-white px-4 py-2">Item Name</th>
          <th className="border text-white px-4 py-2">Category</th>
          <th className="border text-white px-4 py-2">Qty</th>
          <th className="border text-white px-4 py-2">Department</th>
          <th className="border text-white px-4 py-2">Required Date</th>
          <th className="border text-white px-4 py-2">Requesting Reason</th>
          <th className="border text-white px-4 py-2">Actions</th>

        </tr>
      </thead>
      <tbody>
        <tr className="text-center bg-blue-100 text-black">
          <td className="border border-blue-900 px-4 py-2">
            1
          </td>
          <td className="border border-blue-900 px-4 py-2">
            Keyword
          </td>
          <td className="border border-blue-900 px-4 py-2">
            Electronics 
          </td>
          <td className="border border-blue-900 px-4 py-2">
           29
          </td>

          <td className="border border-blue-900 px-4 py-2">
           CS & IT
          </td>
          <td className="border border-blue-900 px-4 py-2">
           23/03/2023
          </td>

          <td className="border border-blue-900 px-4 py-2">
           Conference
          </td>
            <td className="border border-blue-900 px-4 py-2">
            <button className="bg-green-500 text-white mx-1 px-3 py-2 rounded-md"><a href="#">Approve</a></button>   
             <button className="bg-red-500 text-white mx-1 px-3 py-2 rounded-md"><a href="#">Decline</a></button>   
         
                </td>

        </tr>

        <tr>
         
        </tr>
      </tbody>
    </table>
  </div>
  </div>


    </div>
  )
}

export default AdminRequestTable
