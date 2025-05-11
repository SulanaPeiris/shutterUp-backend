import React, { useEffect, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import PostModal from "./PostModal";
import { likePost, unlikePost, fetchLikeCount, checkIsLiked } from "../../services/likeService";
import { useAuth } from "../../context/AuthContext";

const PostCard = ({ id, mediaUrl, username, description, likeCount, commentCount }) => {
  const [open, setOpen] = useState(false);
  const [likes, setLikes] = useState(likeCount || 0);
  const [liked, setLiked] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (user?.id && id) {
      checkIsLiked(id, user.id).then(setLiked).catch(() => setLiked(false));
    }
  }, [user, id]);

  const handleLikeToggle = async (e) => {
    e.stopPropagation(); // prevent triggering modal open
    try {
      if (liked) {
        await unlikePost(id, user.id);
      } else {
        await likePost(id, user.id);
      }
      const newCount = await fetchLikeCount(id);
      setLikes(newCount);
      setLiked(!liked);
    } catch (err) {
      console.error("Failed to toggle like", err);
    }
  };

  const postData = {
    id,
    src: mediaUrl,
    username,
    caption: description,
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
      >
        <img src={mediaUrl} alt={description} className="w-full h-48 object-cover rounded-t-lg" />
        <div className="p-4">
          <span className="text-sm text-gray-400">@{username}</span>
          <p className="text-sm mb-3 text-white">{description}</p>
          <div className="flex justify-start items-center space-x-4 text-gray-400 text-sm">
            <button
              onClick={handleLikeToggle}
              className="flex items-center space-x-1 focus:outline-none"
            >
              <Heart className={`w-4 h-4 ${liked ? "text-red-500" : "text-gray-400"}`} />
              <span>{likes}</span>
            </button>

            <div
              className="flex items-center space-x-1"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click from closing
                setOpen(true);
              }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>{commentCount}</span>
            </div>
          </div>
        </div>
      </div>

      <PostModal isOpen={open} onClose={() => setOpen(false)} post={postData} />
    </>
  );
};

export default PostCard;
