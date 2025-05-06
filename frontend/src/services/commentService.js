import axios from "axios";

const API = "http://localhost:8080/api/comments";

export const addComment = async ({ postId, userId, content }) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.post(API, { postId, userId, content }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchCommentsByPost = async (postId) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API}/post/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateComment = async (commentId, userId, content) => {
  const token = sessionStorage.getItem("token");
  const res = await axios.put(`${API}/${commentId}?userId=${userId}`, { content }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteComment = async (commentId, userId) => {
  const token = sessionStorage.getItem("token");
  await axios.delete(`${API}/${commentId}?userId=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
