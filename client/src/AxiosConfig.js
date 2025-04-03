import axios from "axios";

const Instance = axios.create({
    baseURL: `https://inventory-management-system-backend-grnp.onrender.com`,
    // baseURL: "http://localhost:8080/",
    withCredentials:true,
});

export default Instance;
