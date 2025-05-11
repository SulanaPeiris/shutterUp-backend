import axios from "axios";

const API = "http://localhost:8080/api";

export const createPost = async (postData, userId) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.post(`http://localhost:8080/api/posts`, {
    ...postData,
    userId, // include user ID for backend association
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


export const fetchPostsByUserId = async (userId) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${API}/posts/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const posts = response.data;

  // Parallel fetch likes and comments
  const withCounts = await Promise.all(
    posts.map(async (post) => {
      const [likesRes, commentsRes] = await Promise.all([
        axios.get(`${API}/likes/count/${post.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API}/comments/post/${post.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      return {
        ...post,
        likeCount: likesRes.data,
        commentCount: commentsRes.data.length,
      };
    })
  );

  return withCounts;
};


export const fetchAllPosts = async () => {
  const token = sessionStorage.getItem("token"); // optional if public
  const res = await axios.get("http://localhost:8080/api/posts", {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined
    }
  });
  return res.data;
};

