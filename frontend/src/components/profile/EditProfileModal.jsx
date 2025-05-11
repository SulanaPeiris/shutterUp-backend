import React, { useState } from "react";

const EditProfileModal = ({ profile, isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    username: profile?.username || "",
    bio: profile?.bio || "",
    profilePicture: profile?.profilePicture || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // ✅ fixed here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center font-inter">
      <div className="bg-white text-black rounded-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label>Username</label>
            <input
              name="username" // ✅ match the state field
              value={form.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label>Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label>Profile Picture URL</label>
            <input
              name="profilePicture"
              value={form.profilePicture}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-white rounded"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
