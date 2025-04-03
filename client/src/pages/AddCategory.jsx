// import React from "react";
// import { useAuth } from "../context/AuthContext";
// import Instance from "../AxiosConfig";
// import { useNavigate } from "react-router-dom";
// import { useState ,useEffect} from "react";

// function AddInventory() {
//   const [itemName, setItemName] = useState("");
//   const [category, setCategory] = useState("");
//   const [qty, setQty] = useState("");
//   const [threshold, setThreshold] = useState("");

//   const { setIsAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   const handleAddInventory = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await Instance.post("/auth/addInventory", {
//         itemName,
//         category,
//         qty,
//         threshold,
//       });

//       if (response.status === 200) {
//         setIsAuthenticated(true);
//         navigate("/");
//       }
//     } catch (error) {
//       console.error(
//         "Add Inventory error:",
//         error.response?.data || error.message
//       );
//       alert("Error in adding Inventory");
//     }
//   };

//   return (
//     <>
//       <div className="wrapper">
//         <div className="main flex items-start justify-between">
//           <div className="display">
//             <div className="add_inventory rounded-2xl bg-blue-100 w-4/5 m-auto my-8 px-10 py-8">
//               <h1 className=" text-blue-900  text-3xl   font-bold m-auto w-96 text-center px-8 py-2 ">
//                 Add Inventory
//               </h1>
//               <form onSubmit={handleAddInventory}>
//                 <div className="input_inventory flex justify-center items-center gap-8 px-6 py-10">
//                   <div className="inventory_name font-bold">
//                     <label className="" for="item_name">
//                       Inventory Name
//                     </label>

//                     <input
//                       className="border-2 my-5 px-5 py-2"
//                       type="text"
//                       placeholder="Items Name"
//                       name="itemName"
//                       value={itemName}
//                       onChange={(e) => setItemName(e.target.value)}
//                     />
//                   </div>
//                   <div className="category font-bold">
//                     {" "}
//                     <label for="category">Category</label>
//                     <select className="border-2 my-5 px-5 py-2 "
//                      name="category"
//                      value={category}
//                      onChange={(e) => setQty(e.target.value)}
//                     >
//                       <option value="Stationary">Stationary</option>
//                     </select>
//                   </div>

//                   <div className="qty font-bold">
//                     <label for="qty">Qty</label>

//                     <input
//                       className="border-2 my-5 px-2 py-2 w-32"
//                       type="number"
//                       name="qty"
//                       value={qty}
//                       onChange={(e) => setQty(e.target.value)}
//                     />
                    

//                     <div className="qty font-bold">
//                     <label for="qty">Threshold</label>

//                     <input
//                       className="border-2 my-5 px-2 py-2 w-32"
//                       type="number"
//                       name="threshold"
//                       value={threshold}
//                       onChange={(e) => setThreshold(e.target.value)}
//                     />
                    
//                   </div>
//                 </div>
//                 <div className="buttons flex justify-center items-center">
//                   <button
//                     className="px-8 py-3 bg-blue-900 text-white rounded-2xl text-center mx-10"
//                     type="submit"
//                   >
//                     Submit
//                   </button>
//                   <button className="px-8 py-3 bg-gray-900  text-white rounded-2xl text-center mx-10">
//                     Clear
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddInventory;
