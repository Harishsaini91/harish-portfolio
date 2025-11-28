import React, { useState, useRef } from "react";
import FilePreview from "./FilePreview";
import "../../assets/styles/dropzone.css";

/**
 * UploadDropzone
 *
 * Props:
 * - onFiles(filesArray)
 * - label (optional)
 *
 * Behavior:
 * - Drag & drop OR click to open files
 * - Supports image/* and video/*
 * - Previews visible
 */

export default function UploadDropzone({ onFiles = () => {}, label = "Upload Media" }) {
  const [previews, setPreviews] = useState([]);
  const [hover, setHover] = useState(false);
  const inputRef = useRef(null);

  function handleDrop(e) {
    e.preventDefault();
    setHover(false);

    const files = [...e.dataTransfer.files];
    if (files.length) {
      setPreviews((prev) => [
        ...prev,
        ...files.map((file) => ({
          file,
          previewUrl: URL.createObjectURL(file),
        })),
      ]);
      onFiles(files);
    }
  }

  function handleSelect(e) {
    const files = [...e.target.files];
    setPreviews((prev) => [
      ...prev,
      ...files.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ]);
    onFiles(files);
  }

  return (
    <div className="dropzone-wrapper">
      <div
        className={`dropzone ${hover ? "hover" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setHover(true);
        }}
        onDragLeave={() => setHover(false)}
        onDrop={handleDrop}
      >
        <p>{label}</p>
        <p className="dz-sub">Click or drag files here</p>
      </div>

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleSelect}
        style={{ display: "none" }}
      />

      {/* Preview grid */}
      {previews.length > 0 && (
        <div className="preview-grid">
          {previews.map((p, i) => (
            <FilePreview key={i} src={p.previewUrl} file={p.file} />
          ))}
        </div>
      )}
    </div>
  );
}
