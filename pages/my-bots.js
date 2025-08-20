import { useState, useEffect } from "react";
import BotCard from "../components/BotCard";

export default function MyBots() {
  const [bots, setBots] = useState([]);
  const [user, setUser] = useState(null);
  const [editingBot, setEditingBot] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [previewBot, setPreviewBot] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      window.location.href = "/register";
      return;
    }
    setUser(storedUser);

    const storedBots = JSON.parse(localStorage.getItem("bots")) || [];
    setBots(storedBots);
  }, []);

  const handleSaveBot = (bot) => {
    let updatedBots;
    if (editingBot) {
      updatedBots = bots.map((b) => (b.id === editingBot.id ? { ...bot, id: editingBot.id, owner: user.username } : b));
    } else {
      updatedBots = [...bots, { ...bot, id: Date.now(), owner: user.username }];
    }
    setBots(updatedBots);
    localStorage.setItem("bots", JSON.stringify(updatedBots));
    setShowForm(false);
    setEditingBot(null);
  };

  const handleDeleteBot = (id) => {
    const updatedBots = bots.filter((b) => b.id !== id);
    setBots(updatedBots);
    localStorage.setItem("bots", JSON.stringify(updatedBots));
    setPreviewBot(null);
  };

  const handleEditBot = (bot) => {
    if (!user || bot.owner !== user.username) return;
    setEditingBot(bot);
    setShowForm(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bots</h1>

      {/* Add Bot Button */}
      <button
        onClick={() => {
          setShowForm(true);
          setEditingBot(null);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        + Add Bot
      </button>

      {/* Bot List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bots
          .filter((b) => b.owner === user?.username)
          .map((bot) => (
            <div
              key={bot.id}
              onClick={() => setPreviewBot(bot)}
              className="cursor-pointer"
            >
              <BotCard
                bot={bot}
                onDelete={handleDeleteBot}
                onEdit={handleEditBot}
                showActions={true}
              />
            </div>
          ))}
      </div>

      {/* Preview */}
      {previewBot && (
        <div className="mt-6 p-4 border rounded-lg shadow bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">{previewBot.title}</h2>
            <button
              onClick={() => setPreviewBot(null)}
              className="text-red-500 font-bold"
            >
              ✖ Close Preview
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Category:</strong> {previewBot.category}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Prompt:</strong> {previewBot.prompt}
          </p>
          <div className="w-full h-[500px] border rounded">
            <iframe
              src={previewBot.url}
              title={previewBot.title}
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Bot Form */}
      {showForm && (
        <div className="mt-6 p-4 border rounded bg-white shadow">
          <h2 className="text-lg font-bold mb-2">{editingBot ? "Edit Bot" : "Add Bot"}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const bot = {
                title: e.target.title.value,
                category: e.target.category.value,
                prompt: e.target.prompt.value,
                url: e.target.url.value,
              };
              handleSaveBot(bot);
            }}
          >
            <input
              name="title"
              placeholder="Title"
              defaultValue={editingBot?.title || ""}
              className="w-full border p-2 mb-2 rounded"
              required
            />
            <input
              name="category"
              placeholder="Category"
              defaultValue={editingBot?.category || ""}
              className="w-full border p-2 mb-2 rounded"
              required
            />
            <textarea
              name="prompt"
              placeholder="Prompt"
              defaultValue={editingBot?.prompt || ""}
              className="w-full border p-2 mb-2 rounded"
              required
            />
            <input
              name="url"
              placeholder="Bot URL"
              defaultValue={editingBot?.url || ""}
              className="w-full border p-2 mb-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
