import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchCompletedTutorials } from "../../services/tutorialProgressService";

const MyCertifications = () => {
  const { user } = useAuth();
  const [certified, setCertified] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCompletedTutorials(user.id);
        setCertified(data);
      } catch (err) {
        console.error("Failed to load certifications", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) load();
  }, [user]);

  if (loading) return <p className="text-gray-400 mt-6">Loading your certificates...</p>;
  if (!certified.length) return <p className="text-gray-400 mt-6">No certifications yet.</p>;

  return (
    <div className="grid gap-4 mt-6">
      {certified.map((cert) => (
        <div key={cert.id} className="bg-gray-800 rounded p-4 shadow">
          <h2 className="text-lg font-semibold text-white">{cert.title}</h2>
          <p className="text-sm text-gray-400 mb-2">You have completed this tutorial.</p>
          <a
            href={cert.certificateUrl || "#"}
            className="text-sm text-blue-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Certificate
          </a>
        </div>
      ))}
    </div>
  );
};

export default MyCertifications;
