import React from "react";
import LogoutButton from "./LogoutButton";
import "../../assets/styles/main.css";

/**
 * AdminToolbar
 *
 * Props:
 * - isAdmin
 * - onCreate()
 * - onLogout()
 */

export default function AdminToolbar({ isAdmin, onCreate, onLogout }) {
  if (!isAdmin) return null;

  return (
    <div className="admin-toolbar">
      <button className="btn primary" onClick={onCreate}>
        + Create
      </button>

      <LogoutButton onLogout={onLogout} />
    </div>
  );
}
 