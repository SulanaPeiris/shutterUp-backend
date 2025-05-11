import React, { useState } from "react";

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    mediaUrl: "",
    mediaType: "IMAGE",
    cameraSettings: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // Pass full post data to parent
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description, tips or camera setup..."
            value={form.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            rows={3}
            required
          />
          <input
            name="mediaUrl"
            placeholder="Image or Video URL"
            value={form.mediaUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <select
            name="mediaType"
            value={form.mediaType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="IMAGE">Image</option>
            <option value="VIDEO">Video</option>
          </select>
          <input
            name="cameraSettings"
            placeholder="Camera Settings (e.g. ISO 100, f/2.8)"
            value={form.cameraSettings}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-cyan-600 text-white px-4 py-2 rounded"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
