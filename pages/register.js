import { useState } from "react";
import { useRouter } from "next/router";

/**
 * Simple register: stores a single "user" object in localStorage.
 * After register, redirects to /my-bots.
 */
export default function Register({ onLogin }) {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username: username.trim() };
    if (!user.username) return;

    localStorage.setItem("user", JSON.stringify(user));
    onLogin(user);
    router.push("/my-bots");
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-sm space-y-3"
      >
        <h2 className="text-xl font-bold">Register</h2>
        <input
          className="border p-2 w-full rounded"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Create Account
        </button>
      </form>
    </div>
  );
}
