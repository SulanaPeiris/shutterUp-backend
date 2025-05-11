import React, { useState, useEffect } from "react";
import {
  createTutorial,
  updateTutorial,
} from "../../services/tutorialService";

const TutorialForm = ({ tutorialToEdit, onClose }) => {
  const [tutorial, setTutorial] = useState({
    title: "",
    content: "",
    category: "",
    templateType: "",
    steps: [{ title: "", description: "", imageUrl: "", stepOrder: 1 }],
  });

  useEffect(() => {
    if (tutorialToEdit) {
      setTutorial({
        ...tutorialToEdit,
        steps: tutorialToEdit.steps.length
          ? tutorialToEdit.steps
          : [{ title: "", description: "", imageUrl: "", stepOrder: 1 }],
      });
    }
  }, [tutorialToEdit]);

  const isEdit = Boolean(tutorialToEdit?.id);

  const handleChange = (e) => {
    setTutorial({ ...tutorial, [e.target.name]: e.target.value });
  };

  const handleStepChange = (index, field, value) => {
    const updated = [...tutorial.steps];
    updated[index][field] = value;
    setTutorial({ ...tutorial, steps: updated });
  };

  const addStep = () => {
    setTutorial({
      ...tutorial,
      steps: [
        ...tutorial.steps,
        {
          title: "",
          description: "",
          imageUrl: "",
          stepOrder: tutorial.steps.length + 1,
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const creatorId = sessionStorage.getItem("userId");
    const payload = { ...tutorial, creatorId };

    try {
      if (isEdit) {
        await updateTutorial(tutorial.id, payload);
        alert("Tutorial updated.");
      } else {
        await createTutorial(payload);
        alert("Tutorial created.");
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error occurred.");
    }
  };

  return (
    <div className="bg-white text-black rounded-xl p-6 shadow-lg mb-8">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Edit Tutorial" : "Create Tutorial"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="input"
          value={tutorial.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="input"
          value={tutorial.category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="templateType"
          placeholder="Template Type"
          className="input"
          value={tutorial.templateType}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          className="input"
          rows={4}
          value={tutorial.content}
          onChange={handleChange}
          required
        />

        <h3 className="text-lg font-semibold">Steps</h3>
        {tutorial.steps.map((step, index) => (
          <div key={index} className="border p-4 rounded-md mb-3">
            <input
              type="text"
              placeholder="Step Title"
              className="input"
              value={step.title}
              onChange={(e) => handleStepChange(index, "title", e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="input"
              value={step.description}
              onChange={(e) =>
                handleStepChange(index, "description", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Image URL"
              className="input"
              value={step.imageUrl}
              onChange={(e) =>
                handleStepChange(index, "imageUrl", e.target.value)
              }
            />
          </div>
        ))}

        <button type="button" onClick={addStep} className="bg-gray-300 px-3 py-1 rounded">
          Add Step
        </button>

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {isEdit ? "Update" : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TutorialForm;
