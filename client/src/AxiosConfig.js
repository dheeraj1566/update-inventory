import axios from "axios";

const Instance = axios.create({
    baseURL: `https://update-inventory-eikt.onrender.com`,
    // baseURL: "http://localhost:8080/",
    withCredentials:true,
});

export default Instance;
