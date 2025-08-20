export default function BotCard({ bot, onDelete, onEdit, showActions }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <h2 className="text-lg font-bold mb-1">{bot.title}</h2>
      <p className="text-sm text-gray-500 mb-2">{bot.category}</p>

      {showActions && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(bot);
            }}
            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(bot.id);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
