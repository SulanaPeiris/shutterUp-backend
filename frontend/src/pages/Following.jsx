import React, { useEffect, useState } from 'react';
import {
  getAllUsers,
  followUser,
  unfollowUser,
  isFollowing,
} from '../services/followService';

function Following() {
  const [users, setUsers] = useState([]);
  const [followingMap, setFollowingMap] = useState({});
  const currentUserId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (!currentUserId) return;
    loadUsers();
  }, [currentUserId]);

  const loadUsers = async () => {
    try {
      const allUsers = await getAllUsers();
      const otherUsers = allUsers.filter(u => u.id.toString() !== currentUserId);

      const followStatusMap = {};
      for (const user of otherUsers) {
        followStatusMap[user.id] = await isFollowing(currentUserId, user.id);
      }

      setUsers(otherUsers);
      setFollowingMap(followStatusMap);
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  };

  const handleFollowToggle = async (targetUserId) => {
    try {
      if (followingMap[targetUserId]) {
        await unfollowUser(currentUserId, targetUserId);
      } else {
        await followUser(currentUserId, targetUserId);
      }

      setFollowingMap((prev) => ({
        ...prev,
        [targetUserId]: !prev[targetUserId],
      }));
    } catch (err) {
      console.error('Error updating follow state:', err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Follow Other Users</h1>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 border rounded-xl shadow bg-white"
          >
            <div>
              <p className="font-semibold text-lg">{user.name}</p>
              <p className="text-gray-500 text-sm">@{user.username}</p>
            </div>
            <button
              onClick={() => handleFollowToggle(user.id)}
              className={`px-4 py-2 rounded-xl text-white transition ${
                followingMap[user.id] ? 'bg-red-500' : 'bg-blue-500'
              }`}
            >
              {followingMap[user.id] ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Following;
