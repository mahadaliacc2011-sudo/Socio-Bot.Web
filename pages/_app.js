import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

/**
 * Global state:
 * - currentUser (localStorage key: "user")
 * - bots (localStorage key: "bots") => array of {id,title,category,prompt,embedCode,owner}
 */
export default function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Load current user on boot
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setCurrentUser(JSON.parse(u));
  }, []);

  // login / logout helpers
  const handleLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <Component {...pageProps} currentUser={currentUser} onLogin={handleLogin} />
    </div>
  );
}
