import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/auth';

/**
 * Sign up a new user
 * @param {Object} user - contains email, password, username, name, bio
 */
export const signupUser = async ({ email, password, username, name, bio }) => {
  await axios.post("http://localhost:8080/api/auth/signup", {
    email,
    password,
    username,
    name,
    bio,
  });
};


/**
 * Log in a user
 * @param {string} email 
 * @param {string} password 
 * @returns {Object} { token, id, email, username, role }
 */
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, null, {
    params: { email, password },
  });

  // Save to session storage
  const { token, id, role, username } = response.data;
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("userId", id);
  sessionStorage.setItem("role", role);
  sessionStorage.setItem("username", username);

  return response.data;
};
