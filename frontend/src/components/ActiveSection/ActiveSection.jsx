import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ProjectGrid from "./ProjectGrid";
import EmptyState from "./EmptyState";
import "../../assets/styles/webdev.css";
import "../../assets/styles/sketch.css";
import "../../assets/styles/creative.css";

/**
 * ActiveSection
 * Props:
 * - projects
 * - isAdmin
 * - onCreate
 * - onEdit
 * - onDelete
 * - onOpen  (project open modal)
 * - category (webdev/sketch/creative)
 */

export default function ActiveSection({
  projects = [],
  isAdmin = false,
  onCreate,
  onEdit,
  onDelete,
  onOpen,
  category,
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`active-section ${theme.className}`}>
      <div className="active-title-row">
        <h2>{theme.name}</h2>

        {isAdmin && (
          <button className="btn primary" onClick={onCreate}>
            + Create Project
          </button>
        )}
      </div>

      {/* If no projects */}
      {projects.length === 0 ? (
        <EmptyState isAdmin={isAdmin} onCreate={onCreate} />
      ) : (
        <ProjectGrid
          category={category}
          projects={projects}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
          onOpen={onOpen}
        />
      )}
    </section>
  );
}
