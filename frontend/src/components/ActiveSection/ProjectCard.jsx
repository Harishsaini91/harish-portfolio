import React from "react";
import "../../assets/styles/webdev.css";
import "../../assets/styles/sketch.css";
import "../../assets/styles/creative.css";

/**
 * ProjectCard
 * Props:
 * - project
 * - isAdmin
 * - onEdit
 * - onDelete
 * - onOpen
 */

export default function ProjectCard({ project, isAdmin, onEdit, onDelete, onOpen }) {
  const media = project.media?.[0];

  return (
    <div className="project-card">
      <div className="project-thumb" onClick={() => onOpen(project)}>
        {media ? (
          media.type === "video" ? (
            <video
              src={media.url}
              muted
              loop
              playsInline
              preload="metadata"
              className="project-thumb-video"
            />
          ) : (
            <img src={media.url} alt={project.title} className="project-thumb-img" />
          )
        ) : (
          <div className="thumb-placeholder">No media</div>
        )}
      </div>

      <div className="project-info">
        <h3>{project.title}</h3>
        <p className="project-short">{project.description?.slice(0, 80)}</p>

        <div className="project-actions">
          <button className="btn small" onClick={() => onOpen(project)}>
            View
          </button>

          {isAdmin && (
            <>
              <button className="btn small" onClick={() => onEdit(project)}>
                Edit
              </button>
              <button className="btn small danger" onClick={() => onDelete(project._id)}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
