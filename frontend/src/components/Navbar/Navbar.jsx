import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "../../assets/styles/navbar.css";

/**
 * Navbar
 * 
 * Props:
 *  - active: current active category (webdev | sketch | creative)
 *  - setActive: function(categoryId)
 *
 * Behavior:
 *  - Shows 3 main tabs
 *  - On click → setActive(category), theme automatically updates from ThemeProvider
 *  - Vibe/style changes based on theme.className (body class)
 */

export default function Navbar({ active, setActive }) {
  const { theme } = useContext(ThemeContext);

  const TABS = [
    { id: "webdev", label: "Web Development" },
    { id: "sketch", label: "Sketches" },
    { id: "creative", label: "Creative" },
  ];

  return (
    <nav className={`navbar ${theme.className}`}>
      <div className="navbar-container">
        <ul className="navbar-list">
          {TABS.map((t) => (
            <li
              key={t.id}
              className={`navbar-item ${active === t.id ? "active" : ""}`}
              onClick={() => setActive(t.id)}
            >
              <span>{t.label}</span>
              {active === t.id && <div className="active-underline" />}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
