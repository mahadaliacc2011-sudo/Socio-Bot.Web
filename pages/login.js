import { useState } from "react";
import { useRouter } from "next/router";

/**
 * Simple login: matches username against the one saved in localStorage ("user").
 * If none exists, asks user to register first.
 */
export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const saved = localStorage.getItem("user");
    if (!saved) {
      alert("No account found. Please register first.");
      router.push("/register");
      return;
    }
    const savedUser = JSON.parse(saved);
    if (savedUser.username === username.trim()) {
      onLogin(savedUser);
      router.push("/my-bots");
    } else {
      alert("Username does not match the registered account.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-sm space-y-3"
      >
        <h2 className="text-xl font-bold">Login</h2>
        <input
          className="border p-2 w-full rounded"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

