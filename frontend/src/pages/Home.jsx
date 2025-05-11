import React, { useEffect, useState } from "react";
import { fetchAllPosts } from "../services/postService";
import PostCard from "../components/global/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-white p-8">Loading posts...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Explore Photos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            mediaUrl={post.mediaUrl}
            username={post.username}
            description={post.description}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
