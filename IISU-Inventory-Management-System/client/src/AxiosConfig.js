import axios from "axios";

const Instance = axios.create({
    baseURL: "http://localhost:8080/",
    // baseURL:`https://iisu-inventory-management-system.onrender.com`,
    withCredentials:true,
});

export default Instance;
