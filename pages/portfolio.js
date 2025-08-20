import React, { useState } from "react";
import BotPreview from "../components/BotPreview";

export default function Portfolio() {
  const [bots, setBots] = useState([
    {
      id: 1,
      title: "My First Bot",
      category: "Fun",
      prompt: "This is a fun bot!",
      embed: `<iframe src="https://example.com/embed/bot1" width="100%" height="300"></iframe>`,
    },
    {
      id: 2,
      title: "Helper Bot",
      category: "Utility",
      prompt: "Helps you with tasks.",
      embed: `<iframe src="https://example.com/embed/bot2" width="100%" height="300"></iframe>`,
    },
  ]);

  const [selectedBot, setSelectedBot] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Portfolio</h1>

      {/* Bot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {bots.map((bot) => (
          <div
            key={bot.id}
            onClick={() => setSelectedBot(bot)}
            className="p-4 border rounded-lg cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{bot.title}</h2>
            <p className="text-sm text-gray-600">{bot.category}</p>
          </div>
        ))}
      </div>

      {/* Preview Section */}
      {selectedBot && (
        <div className="mt-6">
          <BotPreview bot={selectedBot} />
        </div>
      )}
    </div>
  );
}

