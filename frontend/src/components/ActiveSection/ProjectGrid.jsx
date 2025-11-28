import React from "react";
import ProjectCard from "./ProjectCard";

/**
 * ProjectGrid
 * Shows different layout depending on category:
 * - webdev -> uniform grid
 * - sketch -> masonry layout
 * - creative -> large featured cards
 */

export default function ProjectGrid({ category, projects, isAdmin, onEdit, onDelete, onOpen }) {
  if (category === "sketch") {
    return (
      <div className="sketch-masonry">
        {projects.map((p) => (
          <ProjectCard
            key={p._id}
            project={p}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
            onOpen={onOpen}
          />
        ))}
      </div>
    );
  }

  if (category === "creative") {
    return (
      <div className="creative-list">
        {projects.map((p) => (
          <ProjectCard
            key={p._id}
            project={p}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
            onOpen={onOpen}
          />
        ))}
      </div>
    );
  }

  // default webdev grid
  return (
    <div className="webdev-grid">
      {projects.map((p) => (
        <ProjectCard
          key={p._id}
          project={p}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
