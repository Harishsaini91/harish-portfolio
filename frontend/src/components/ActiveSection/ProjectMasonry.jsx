import React from "react";

/**
 * OPTIONAL helper for advanced masonry layout
 * Not used directly (ProjectGrid handles it)
 */

export default function ProjectMasonry({ children }) {
  return <div className="masonry">{children}</div>;
}
