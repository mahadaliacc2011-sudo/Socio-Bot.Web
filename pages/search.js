import { useState, useEffect } from "react";
import BotCard from "../components/BotCard";

export default function Search() {
  const [bots, setBots] = useState([]);
  const [query, setQuery] = useState("");
  const [previewBot, setPreviewBot] = useState(null);

  useEffect(() => {
    const storedBots = JSON.parse(localStorage.getItem("bots")) || [];
    setBots(storedBots);
  }, []);

  const filteredBots = bots.filter((b) => {
    if (!query) return true;
    return (
      (b.title?.toLowerCase() || "").includes(query.toLowerCase()) ||
      (b.category?.toLowerCase() || "").includes(query.toLowerCase())
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Bots</h1>
      <input
        type="text"
        placeholder="Search by title or category..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      {/* Bot List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBots.map((bot) => (
          <div
            key={bot.id}
            onClick={() => setPreviewBot(bot)}
            className="cursor-pointer"
          >
            <BotCard bot={bot} showActions={false} />
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
    </div>
  );
}


