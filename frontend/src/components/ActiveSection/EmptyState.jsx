import React from "react";

export default function EmptyState({ isAdmin, onCreate }) {
  return (
    <div className="empty-state">
      <p>No projects found in this category.</p>

      {isAdmin && (
        <button className="btn" onClick={onCreate}>
          Create your first project
        </button>
      )}
    </div>
  );
}
