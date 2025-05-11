import axios from 'axios';

const API = 'http://localhost:8080/api'; // Adjust if using proxy or deployed URL

const token = sessionStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getAllUsers = async () => {
  const res = await axios.get(`${API}/users`, config);
  return res.data;
};

export const followUser = async (followerId, followeeId) => {
  await axios.post(`${API}/follow/follow`, null, {
    params: { followerId, followeeId },
    ...config,
  });
};

export const unfollowUser = async (followerId, followeeId) => {
  await axios.post(`${API}/follow/unfollow`, null, {
    params: { followerId, followeeId },
    ...config,
  });
};

export const isFollowing = async (followerId, followeeId) => {
  const res = await axios.get(`${API}/follow/isFollowing`, {
    params: { followerId, followeeId },
    ...config,
  });
  return res.data;
};

export const fetchFollowers = async (userId) => {
  const res = await axios.get(`http://localhost:8080/api/follow/followers/${userId}`, config);
  return res.data;
};

export const fetchFollowing = async (userId) => {
  const res = await axios.get(`http://localhost:8080/api/follow/following/${userId}`, config);
  return res.data;
};

