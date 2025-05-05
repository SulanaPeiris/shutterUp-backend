import React, { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import PostModal from "./PostModal";

const PostCard = ({ src, username, caption, likes, comments }) => {
  const [open, setOpen] = useState(false);

  const postData = { src, username, caption };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
      >
        <img
          src={src}
          alt={caption}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <span className="text-sm text-gray-400">@{username}</span>
          <p className="text-sm mb-3 text-white">{caption}</p>
          <div className="flex justify-start items-center space-x-4 text-gray-400 text-sm">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{likes}</span>
            </div>
            <div
              className="flex items-center space-x-1"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click from closing
                setOpen(true);
              }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>{comments}</span>
            </div>
          </div>
        </div>
      </div>

      <PostModal isOpen={open} onClose={() => setOpen(false)} post={postData} />
    </>
  );
};

export default PostCard;
