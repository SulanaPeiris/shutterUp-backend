import React, { useEffect, useState } from "react";
import { fetchEnrolledTutorials, generateCertificate } from "../../services/tutorialProgressService";
import { useAuth } from "../../context/AuthContext";

const MyCourses = () => {
  const { user } = useAuth();
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchEnrolledTutorials(user.id);
        setEnrolled(data);
      } catch (err) {
        console.error("Failed to load tutorials", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) load();
  }, [user]);

  const handleCertificate = async (tutorialId) => {
    try {
      const cert = await generateCertificate(tutorialId, user.id);
      alert(`🎓 Certificate Generated for: ${cert.title}`);
    } catch {
      alert("You must complete all steps to get the certificate.");
    }
  };

  if (loading) return <p className="text-gray-400 mt-6">Loading your courses...</p>;
  if (!enrolled.length) return <p className="text-gray-400 mt-6">You haven't enrolled in any tutorials yet.</p>;

  return (
    <div className="grid gap-4 mt-6">
      {enrolled.map((tut) => (
        <div key={tut.id} className="bg-gray-800 rounded p-4 shadow">
          <h2 className="text-lg font-semibold text-white">{tut.title}</h2>
          <p className="text-sm text-gray-400 mb-2">
            Steps Completed: {tut.stepsCompleted} / {tut.totalSteps}
          </p>
          <button
            onClick={() => handleCertificate(tut.id)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
          >
            Generate Certificate
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyCourses;
