import React, { useState } from "react";
import "../../assets/styles/modal.css";

export default function ProjectModal({
  project,
  onClose,
  isAdmin,
  onEdit,
  onDelete,
}) {
  if (!project) return null;

  const media = project.media || [];
  const [index, setIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(true);

  const current = media[index];

  const next = () => {
    setIndex((i) => (i + 1) % media.length);
  };

  const prev = () => {
    setIndex((i) => (i === 0 ? media.length - 1 : i - 1));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`modal media-viewer ${!showInfo ? "hide-info" : ""}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* CLOSE */}
        <div className="media-close-btn" onClick={onClose}>
          ✕
        </div>

        {/* TOGGLE INFO */}
        <div
          className="info-toggle-btn"
          onClick={() => setShowInfo((v) => !v)}
          title="Toggle info"
        >
          {showInfo ? "🡆" : "🡄"}
        </div>

        {/* ARROWS */}
        {media.length > 1 && (
          <>
            <div className="viewer-arrow arrow-left" onClick={prev}>
              ◀
            </div>
            <div className="viewer-arrow arrow-right" onClick={next}>
              ▶
            </div>
          </>
        )}

        {/* BODY */}
        <div className="viewer-body">
          {/* MEDIA */}
          <div className="media-viewer-container">
            {current?.type === "video" ? (
              <video src={current.url} controls autoPlay />
            ) : (
              <img src={current.url} alt="project" />
            )}
          </div>

          {/* INFO */}
          <div className="viewer-info">
            <h2>{project.title}</h2>
            <p>{project.description}</p>

            {project.links?.length > 0 && (
              <div className="viewer-links">
                {project.links.map((l, i) => (
                  <a
                    key={i}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}

            {isAdmin && (
              <footer className="viewer-footer">
                <button className="btn" onClick={() => onEdit(project)}>
                  Edit
                </button>
                <button
                  className="btn danger"
                  onClick={() => onDelete(project._id)}
                >
                  Delete
                </button>
              </footer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
