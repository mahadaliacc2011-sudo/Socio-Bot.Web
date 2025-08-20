import { useState, useEffect } from "react";
import BotCard from "../components/BotCard";

export default function BotsPage() {
  const [bots, setBots] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    prompt: "",
    embedCode: "",
  });

  // Load from localStorage
  useEffect(() => {
    const savedBots = localStorage.getItem("bots");
    if (savedBots) {
      setBots(JSON.parse(savedBots));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("bots", JSON.stringify(bots));
  }, [bots]);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add bot
  const addBot = () => {
    if (!form.title.trim() || !form.embedCode.trim()) return;
    setBots([...bots, { id: Date.now(), ...form }]);
    setForm({ title: "", category: "", description: "", prompt: "", embedCode: "" });
    setShowForm(false);
  };

  // Delete bot
  const deleteBot = (id) => {
    setBots(bots.filter((b) => b.id !== id));
  };

  return (
    <div className="p-6 relative min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">My Portfolio Bots</h1>

      {/* Bot list */}
      <div className="grid gap-4 md:grid-cols-2">
        {bots.map((bot) => (
          <BotCard key={bot.id} bot={bot} onDelete={deleteBot} />
        ))}
      </div>

      {/* Floating + button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg text-3xl flex items-center justify-center hover:bg-blue-700"
      >
        +
      </button>

      {/* Add Bot Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg relative">
            <h2 className="text-xl font-bold mb-4">➕ Add New Bot</h2>

            <input
              type="text"
              name="title"
              placeholder="Bot Title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <textarea
              name="prompt"
              placeholder="Prompt Used"
              value={form.prompt}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <textarea
              name="embedCode"
              placeholder="Embed Code (iframe/script)"
              value={form.embedCode}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded font-mono text-sm"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={addBot}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Save Bot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
