import Link from "next/link";

export default function Navbar({ currentUser, onLogout }) {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/search">Search</Link>
        {currentUser && <Link href="/my-bots">My Bots</Link>}
      </div>
      <div>
        {currentUser ? (
          <div className="flex items-center gap-3">
            <span>Welcome {currentUser.username}</span>
            <button
              onClick={onLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}


