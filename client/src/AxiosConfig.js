import axios from "axios";

const Instance = axios.create({
    // baseURL:"https://iisu-inventory-management-system-c3hw.onrender.com",
    baseURL: "http://localhost:8080/",
    withCredentials:true,
});

export default Instance;
