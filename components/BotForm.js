// components/BotForm.js
import React, { useState } from "react";

export default function BotForm({ onAddBot, onClose, initialBot }) {
  const [title, setTitle] = useState(initialBot?.title || "");
  const [category, setCategory] = useState(initialBot?.category || "");
  const [description, setDescription] = useState(initialBot?.description || "");
  const [url, setUrl] = useState(initialBot?.url || "");
  const [prompt, setPrompt] = useState(initialBot?.prompt || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please register first!");
      return;
    }

    const newBot = {
      id: initialBot?.id || Date.now(),
      owner: user.username,
      title,
      category,
      description,
      url,
      prompt,
    };

    onAddBot(newBot);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {initialBot ? "Edit Bot" : "Add New Bot"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Bot Title"
            className="w-full p-2 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Category"
            className="w-full p-2 border rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Bot URL"
            className="w-full p-2 border rounded-lg"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <textarea
            placeholder="Prompt (only visible to you)"
            className="w-full p-2 border rounded-lg"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {initialBot ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
