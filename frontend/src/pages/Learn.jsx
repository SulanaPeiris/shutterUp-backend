import React, { useEffect, useState } from "react";
import {
  fetchAllTutorials,
  deleteTutorial,
  fetchTutorialById,
} from "../services/tutorialService";
import TutorialForm from "../components/tutorials/TutorialForm"; // ✅ make sure this is local or global import
import { enrollInTutorial } from "../services/tutorialProgressService";

const AcademyPage = () => {
  const [tutorials, setTutorials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTutorial, setEditTutorial] = useState(null);

  const currentUserId = sessionStorage.getItem("userId");
  const role = sessionStorage.getItem("role");
  const isVerified = role === "VERIFIED_USER";

  const loadTutorials = async () => {
    const data = await fetchAllTutorials();
    setTutorials(data);
  };

  useEffect(() => {
    loadTutorials();
  }, []);

  const handleEdit = async (id) => {
    const tutorial = await fetchTutorialById(id);
    setEditTutorial(tutorial);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tutorial?")) {
      await deleteTutorial(id);
      loadTutorials();
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditTutorial(null);
    loadTutorials(); // reload after create or edit
  };

  return (
    <div className="bg-black text-white min-h-screen px-8 py-6">
      <h1 className="text-4xl font-bold mb-2">Shutter Up Academy</h1>
      <p className="text-gray-300 mb-6">
        Learn from photographers around the world.
      </p>

      {isVerified && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Tutorial
          </button>
        </div>
      )}

      {/* 🧩 Conditionally Render TutorialForm */}
      {showForm && (
        <TutorialForm
          onClose={handleCloseForm}
          tutorialToEdit={editTutorial}
        />
      )}

      <div className="grid md:grid-cols-3 gap-6 mt-6">
       {tutorials.map((tut) => (
  <div key={tut.id} className="bg-gray-900 rounded-xl p-4">
    <p className="text-xs text-blue-400 uppercase">{tut.category}</p>
    <h3 className="text-lg font-bold">{tut.title}</h3>
    <p className="text-sm text-gray-400 mb-3 line-clamp-3">{tut.content}</p>

    <div className="flex justify-between items-center mt-2">
      {tut.userId?.toString() === currentUserId ? (
        <div className="flex gap-2">
          <button
            className="text-sm text-yellow-400"
            onClick={() => handleEdit(tut.id)}
          >
            Edit
          </button>
          <button
            className="text-sm text-red-500"
            onClick={() => handleDelete(tut.id)}
          >
            Delete
          </button>
        </div>
      ) : (
        <button
          className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          onClick={async () => {
            try {
              await enrollInTutorial(currentUserId, tut.id);
              alert("You have successfully enrolled!");
            } catch {
              alert("Failed to enroll. You may already be enrolled.");
            }
          }}
        >
          Enroll
        </button>
      )}
    </div>
  </div>
))}

          
      </div>
    </div>
  );
};

export default AcademyPage;
