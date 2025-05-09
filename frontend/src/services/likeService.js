import axios from "axios";

const API = "http://localhost:8080/api/likes";

export const likePost = async (postId, userId) => {
  const token = sessionStorage.getItem("token");
  await axios.post(`${API}?postId=${postId}&userId=${userId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const unlikePost = async (postId, userId) => {
  const token = sessionStorage.getItem("token");
  await axios.delete(`${API}?postId=${postId}&userId=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchLikeCount = async (postId) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`http://localhost:8080/api/likes/count/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const checkIsLiked = async (postId, userId) => {
  const token = sessionStorage.getItem("token");
  const res = await axios.get(`http://localhost:8080/api/likes/isLiked`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { postId, userId },
  });
  return res.data;
};

