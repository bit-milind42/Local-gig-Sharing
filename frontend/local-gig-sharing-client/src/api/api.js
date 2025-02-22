import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Backend URL
  withCredentials: true, // Include cookies for authentication
});

// Register User
export const registerUser = (userData) => API.post("/auth/register", userData);

// Login User
export const loginUser = (userData) => API.post("/auth/login", userData);

// Get Current User
export const getCurrentUser = () => API.get("/auth/me");

export default API;
