import React, { useState, useEffect } from "react";
import Instance from "../AxiosConfig";
import { useNavigate } from "react-router-dom";

function IssueInventory() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    itemName: "",
    issuedToDept: "",
    issuedToFaculty: "",
    issuedQty: "",
    returnValue: "",
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

    console.log(formData);
    const {
      category,
      itemName,
      issuedToDept,
      issuedToFaculty,
      issuedQty,
      returnValue,
    } = formData;
    if (!category || !itemName || !issuedTo || Number(issuedQty || !returnValue) <= 0) {
      alert("All fields are required, and quantity must be greater than zero.");
      return;
    }

    setLoading(true);
    try {
      const response = await Instance.post("/add/issue-inventory", formData);
      if (response.status === 200 || response.status === 201) {
        alert("Inventory issued successfully!");
        setFormData({
          category: categories[0] || "",
          itemName: "",
          issuedToDept: "",
          issuedToFaculty:"",
          issuedQty: "",
          returnValue: "",
        });
        navigate("/issue-inventory");
      }
    } catch (error) {
      console.error(
        "Issued Inventory error:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Error issuing inventory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="main flex items-start justify-center">
        <div className="add_inventory rounded-2xl bg-blue-100 w-3/5 m-auto my-8 px-10 py-8 text-black">
          <h1 className="text-blue-900 text-3xl font-bold text-center px-8 py-2">
            Issue Inventory
          </h1>
          <form onSubmit={handleIssueInventory} className="text-black">
            <div className="grid grid-cols-2 gap-6 px-6 py-10">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border-2 my-2 px-5 py-2 w-full text-black"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="itemName"
                placeholder="Item Name"
                value={formData.itemName}
                onChange={handleChange}
                className="border-2 my-2 px-5 py-2 w-full text-black"
                required
              />
                <select placeholder="Department Name"
                name="issuedToDept"
                value={formData.issuedToDept}
                onChange={handleChange}
                className="border-2 my-2 px-5 py-2 w-full text-black"
                required
              >
                <option value="Department Name">Department Name</option>
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



              <input
                type="text"
                name="issuedToFaculty"
                placeholder="Faculty Name"
                value={formData.issuedToFaculty}
                onChange={handleChange}
                className="border-2 my-2 px-5 py-2 w-full text-black"
                required
              />
              <input
                type="number"
                name="issuedQty"
                placeholder="Quantity"
                min="1"
                value={formData.issuedQty}
                onChange={handleChange}
                className="border-2 my-2 px-5 py-2 w-full text-black"
                required
              />
              <select
                name="returnValue"
                value={formData.returnValue}
                onChange={handleChange}
                className="border-2 my-2 px-5 py-2 w-full text-black"
                required
              >
                <option value="">Select Return Status</option>
                <option value="Returnable">Returnable</option>  
                <option value="Non-Returnable">Non-Returnable</option>
              </select>
            </div>
            <div className="flex justify-center items-center">
              <button
                className="px-8 py-3 bg-blue-900 text-white rounded-2xl mx-4"
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              <button
                className="px-8 py-3 bg-gray-900 text-white rounded-2xl mx-4"
                type="reset"
                onClick={() =>
                  setFormData({
                    category: categories[0] || "",
                    itemName: "",
                    issuedToDept: "",
                    issuedToFaculty:"",
                    issuedQty: "",
                    returnValue: "",
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
            <h2 className="text-xl font-bold text-blue-900">
              Issued Inventory List
            </h2>
            <table className="w-full border-collapse border border-blue-900 mt-4 text-black">
              <thead>
                <tr className="bg-blue-300">
                  <th className="border border-blue-900 px-4 py-2">Category</th>
                  <th className="border border-blue-900 px-4 py-2">
                    Item Name
                  </th>
                  <th className="border border-blue-900 px-4 py-2">
                    Department Name
                  </th>

                  <th className="border border-blue-900 px-4 py-2">
                    Faculty Name
                  </th>
                  <th className="border border-blue-900 px-4 py-2">Quantity</th>
                  <th className="border border-blue-900 px-4 py-2">
                    Return Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {issuedInventory.length > 0 ? (
                  issuedInventory.flatMap((category, categoryIndex) =>
                    category.issuedItems.length > 0
                      ? category.issuedItems.map((item, itemIndex) => (
                          <tr
                            key={`${categoryIndex}-${itemIndex}`}
                            className="text-center bg-blue-100 text-black"
                          >
                            <td className="border border-blue-900 px-4 py-2">
                              {category.category}
                            </td>
                            <td className="border border-blue-900 px-4 py-2">
                              {item.itemName}
                            </td>
                            <td className="border border-blue-900 px-4 py-2">
                              {item.issuedToDept}
                            </td>
                            <td className="border border-blue-900 px-4 py-2">
                              {item.issuedToFaculty}
                            </td>
                            <td className="border border-blue-900 px-4 py-2">
                              {item.issuedQty}
                            </td>
                            <td className="border border-blue-900 px-4 py-2">
                              {item.returnValue}
                            </td>
                          </tr>
                        ))
                      : null
                  )
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No issued inventory
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        {/* </div>
      </div> */}
    </div>
  );
}

export default IssueInventory;
