import React, { useState, useEffect } from "react";
import Instance from "../AxiosConfig";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles

function IssueInventory() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    itemName: "",
    issuedToDept: "",
    issuedToFaculty: "",
    issuedQty: "",
    returnStatus:"Returnable",
  });
  const [issuedInventory, setIssuedInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Instance.get("/add/getTable");
        if (response.data.length > 0) {
          const uniqueCategories = [
            ...new Set(response.data.map((cat) => cat.category)),
          ];
          setCategories(uniqueCategories);
          setFormData((prevData) => ({
            ...prevData,
            category: uniqueCategories[0] || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchIssuedInventory = async () => {
      try {
        const response = await Instance.get("/add/getIssuedInventory");
        setIssuedInventory(response.data);
      } catch (error) {
        console.error("Error fetching issued inventory:", error);
      }
    };

    fetchCategories();
    fetchIssuedInventory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIssueInventory = async (e) => {
    e.preventDefault();

    const {
      category,
      itemName,
      issuedToDept,
      issuedToFaculty,
      issuedQty,
      returnStatus,
    } = formData;
    if (!category || !itemName || !issuedToDept || !issuedToFaculty  || Number(issuedQty) <= 0) {
      toast.error("All fields are required, and quantity must be greater than zero.");

      
      return;
    }

    setLoading(true);
    try {
      const response = await Instance.post("/add/issue-inventory", formData);
      if (response.status === 200 || response.status === 201) {
        toast.success("Issued Inventory Successfully!");
        setFormData({
          category: categories[0] || "",
          itemName: "",
          issuedToDept: "",
          issuedToFaculty:"",
          issuedQty: "",
          returnStatus: "",
        });
        navigate("/issue-inventory");
      }
    } catch (error) {
      console.error(
        "Issued Inventory error:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Error issuing inventory");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <div className="main flex items-start justify-center">
        <div className="add_inventory rounded-2xl bg-blue-100 border-blue-950 w-5/6 m-auto my-8 px-10 py-8 shadow-[10px_10px_30px_rgba(0,0,0,0.3)]">
          <h1 className="text-blue-950 text-3xl font-bold text-center px-8 py-2">
            Issue Inventory
          </h1>
          <form onSubmit={handleIssueInventory} className="text-black">
            <div className="grid grid-cols-3 gap-12 px-12 py-10">
            <div className="font-bold  text-blue-900">
            <label htmlFor="category text-blue-900">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border-2 my-2 px-5 py-2 w-full  text-gray-500 rounded-md"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              </div>

              <div className="font-bold text-blue-900">
              <label htmlFor="itemName text-blue-900">Inventory Name</label>
              <input
                type="text"
                name="itemName"
                placeholder=""
                value={formData.itemName}
                onChange={handleChange}
                className="border-2 my-2 px-5 py-2 w-full  text-gray-500 rounded-md"
                required
              />
</div>


<div className="font-bold text-blue-900">
<label htmlFor="issuedQty text-blue-900">Quantity</label>
              <input
                type="number"
                name="issuedQty"
                placeholder=""
                min="1"
                value={formData.issuedQty}
                onChange={handleChange}
                className="border-2 my-2 px-5 py-2 w-full text-gray-500 rounded-md"
                required
              />

</div>
<div className="font-bold text-blue-900">
<label htmlFor="issuedToDept text-blue-900">Department Name</label>
                <select placeholder="Department Name"
                name="issuedToDept"
                value={formData.issuedToDept}
                onChange={handleChange}
                className="border-2 my-2 px-5 py-2 w-full text-gray-500 rounded-md"
                required
              >
                <option value="Department Name">Select Department</option>
                <option value="Fashion & Textiles">Fashion & Textiles</option>
                <option value="Jewellery Design">Jewellery Design</option>
                 <option value="Fine Arts">Fine Arts</option>
                <option value="Performing Arts">Performing Arts</option>
                <option value="English Literature & Language">English Literature & Language</option>
                <option value="Indian Literature & Languages (Hindi/Sanskrit)">Indian Literature & Languages (Hindi/Sanskrit)</option>
                <option value="Foreign Literature & Languages (French/German)">Foreign Literature & Languages (French/German)</option>
                <option value="Economics">Economics</option>
                <option value="History & Indian Culture">History & Indian Culture</option>
                <option value="Sociology & Social Work">Sociology & Social Work
                </option>
                <option value="Political Science and International Relations">Political Science and International Relations</option>
                <option value="Public Administration">Public Administration</option>
                <option value="Library & Information Science">Library & Information Science</option>
                <option value="Psychology
">Psychology
                </option>
                <option value="Clinical Psychology">Clinical Psychology</option>
                <option value="Journalism and Mass Communication
">Journalism and Mass Communication
                </option>
                <option value="Education">Education</option>
                <option value="Physical Education
">Physical Education
                </option>
                <option value="Zoology ">Zoology </option>
                <option value="Botany
">Botany
</option>
                <option value="Microbiology & Biotechnology">Microbiology & Biotechnology</option>
                <option value="Environmental Science">Environmental Science</option>
                <option value="Home Science">Home Science</option>
                <option value="Physics
">Physics
                </option>
                <option value="Chemistry">Chemistry</option>
                <option value="Geography">Geography</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Statistics
">Statistics
                </option>
                <option value="Computer Science & Information Technology">Computer Science & Information Technology</option>
                <option value="Accounting & Taxation
">Accounting & Taxation
                </option>
                <option value="Business Studies
">Business Studies
                </option>
                <option value="Financial Studies
">Financial Studies
                </option>
                <option value="Tourism and Aviation
">Tourism and Aviation
                </option>
                <option value="Management Studies
">Management Studies
                </option>
              </select>

</div>



<div className="font-bold text-blue-900">
<label htmlFor="issuedToFaculty text-blue-900">Faculty Name</label>
              <input
                type="text"
                name="issuedToFaculty"
                placeholder=""
                value={formData.issuedToFaculty}
                onChange={handleChange}
                className="border-2 my-2 px-5 py-2 w-full text-gray-500 rounded-md"
                required
              />

              </div>

<div className="font-bold text-blue-900">
<label htmlFor="returnStatus text-blue-900">Return Status</label>
              <select
                name="returnStatus"
                value={formData.returnStatus}
                onChange={handleChange}
                className="border-2 my-2 px-5 py-2 w-full text-gray-500 rounded-md"
                required
              >
                <option value="Select Status">Select Status</option>
                <option value="Returnable">Returnable</option>
                <option value="Non Returnable">Non-Returnable</option>
              </select>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button 
                className="px-8 py-3 bg-blue-900 text-white rounded-lg mx-4"
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              <button
                className="px-8 py-3 bg-gray-900 text-white rounded-lg mx-4"
                type="reset"
                onClick={() =>
                  setFormData({
                    category: categories[0] || "",
                    itemName: "",
                    issuedToDept: "",
                    issuedToFaculty:"",
                    issuedQty: "",
                    returnStatus: "",
                  })
                }
              >
                Clear
              </button>
            </div>
          </form>
            </div>
      </div>
          <div className="mt-10 text-black p-10">
         
          </div>
       
    </div>
  );
}

export default IssueInventory;
