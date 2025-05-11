import React from "react";
import PostCard from "../global/PostCard"; // adjust path based on folder structure

function MyPosts({ posts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}

export default MyPosts;
