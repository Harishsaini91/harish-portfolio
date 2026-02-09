import React, { useState } from "react";
import "../../assets/styles/modal.css";

/**
 * ProjectModal (Updated — full media viewer with arrows)
 *
 * Props:
 * - project
 * - onClose
 * - isAdmin
 * - onEdit
 * - onDelete
 */

export default function ProjectModal({ project, onClose, isAdmin, onEdit, onDelete }) {
  if (!project) return null;

  const media = project.media || [];
  const [index, setIndex] = useState(0);

  const current = media[index];

  const next = () => {
    setIndex((prev) => (prev + 1) % media.length);
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal media-viewer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <div className="media-close-btn" onClick={onClose}>
          ✕
        </div>

        {/* Left Arrow */}
        {media.length > 1 && (
          <div className="viewer-arrow arrow-left" onClick={prev}>
            ◀
          </div>
        )}

        {/* MEDIA DISPLAY */}
        <div className="media-viewer-container">
          {current?.type === "video" ? (
            <video src={current.url} controls autoPlay />
          ) : (
            <img src={current.url} alt="project" />
          )}
        </div>

        {/* Right Arrow */}
        {media.length > 1 && (
          <div className="viewer-arrow arrow-right" onClick={next}>
            ▶
          </div>
        )}

        {/* INFO PANEL BELOW MEDIA */}
        <div className="viewer-info">
          <h2 className="viewer-title">{project.title}</h2>

          <p className="viewer-desc">{project.description}</p>

          {project.links?.length > 0 && (
            <div className="viewer-links">
              {project.links.map((l, i) => (
                <a key={i} href={l.url} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* ADMIN CONTROLS */}
        {isAdmin && (
          <footer className="viewer-footer">
            <button className="btn" onClick={() => onEdit(project)}>
              Edit
            </button>
            <button className="btn danger" onClick={() => onDelete(project._id)}>
              Delete
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
