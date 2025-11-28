import React from "react";

/**
 * FilePreview
 *
 * Props:
 * - src
 * - file (optional)
 */

export default function FilePreview({ src, file }) {
  const isVideo =
    file?.type?.startsWith("video") ||
    src.endsWith(".mp4") ||
    src.includes("video");

  return (
    <div className="file-preview">
      {isVideo ? (
        <video src={src} muted loop className="fp-video" />
      ) : (
        <img src={src} className="fp-img" alt="preview" />
      )}
    </div>
  );
}
