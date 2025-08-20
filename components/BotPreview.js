import React, { useState } from "react";

export default function BotCard({ bot, currentUser }) {
  const [expanded, setExpanded] = useState(false);

  const isOwner = currentUser && currentUser.username === bot.owner;

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="border rounded p-4 shadow-md mb-4 bg-white cursor-pointer"
    >
      {!expanded ? (
        // Shrinked view
        <h2 className="font-bold text-lg">{bot.name}</h2>
      ) : (
        // Expanded preview
        <div className="grid grid-cols-2 gap-4">
          {/* Left side */}
          <div>
            <h2 className="font-bold text-lg">{bot.name}</h2>
            <p className="text-gray-600">Category: {bot.category}</p>
            {isOwner ? (
              <>
                <p className="mt-2"><strong>Prompt:</strong> {bot.prompt}</p>
                <p className="mt-2"><strong>Embed Code:</strong> {bot.embedCode}</p>
              </>
            ) : (
              <p className="mt-2 italic text-gray-500">Prompt and embed code are private.</p>
            )}
          </div>

          {/* Right side = Preview */}
          <div className="border rounded overflow-hidden">
            {bot.embedCode ? (
              <div
                dangerouslySetInnerHTML={{ __html: bot.embedCode }}
              />
            ) : (
              <p className="text-gray-500">No preview available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
