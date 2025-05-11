import React from "react";
import { X } from "lucide-react";

const PostModal = ({ isOpen, onClose, post }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
      <div className="bg-[#111] w-full max-w-5xl h-[90vh] rounded-lg overflow-hidden flex relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Left: Image & Caption */}
        <div className="w-1/2 relative bg-black">
          <img
            src={post.src}
            alt={post.caption}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-black bg-opacity-60 px-4 py-2 rounded-lg">
            <p className="text-sm text-white font-semibold">@{post.username}</p>
            <p className="text-sm text-gray-300">{post.caption}</p>
          </div>
        </div>

        {/* Right: Comments */}
        <div className="w-1/2 bg-[#1a1a1a] p-6 overflow-y-auto">
          <h2 className="text-xl font-bold text-white mb-4">Comments</h2>
          {/* Dummy comments */}
          <div className="space-y-4">
            <div className="text-sm text-gray-300">
              <strong>@jane</strong>: Amazing shot!
            </div>
            <div className="text-sm text-gray-300">
              <strong>@mike</strong>: Love the composition 🔥
            </div>
            {/* Add more here or map through a `post.comments` array */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
