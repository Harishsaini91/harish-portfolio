import React from "react";

/**
 * LogoutButton
 *
 * Props:
 * - onLogout()
 */

export default function LogoutButton({ onLogout }) {
  return (
    <button
      className="btn danger"
      onClick={() => {
        if (window.confirm("Logout admin?")) onLogout();
      }}
    >
      Logout
    </button>
  );
}
