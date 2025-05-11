import React from 'react';

const FollowDrawer = ({ isOpen, title, onClose, users }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative bg-white text-black w-full max-w-md p-6 rounded-xl shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>

        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users to show.</p>
        ) : (
          <ul className="space-y-3 max-h-[400px] overflow-y-auto">
            {users.map((user) => (
              <li key={user.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{user.name || user.username}</p>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FollowDrawer;
