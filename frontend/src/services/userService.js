// src/services/userService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/users";

// ✅ Fetch user by ID (protected route with token)
export const fetchUserById = async (id) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ✅ Update user by ID (protected route with token)
// src/services/userService.js
export const updateUser = async (id, updatedData) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.put(`http://localhost:8080/api/users/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


