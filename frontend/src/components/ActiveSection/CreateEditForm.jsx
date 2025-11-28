
// frontend\src\components\ActiveSection\CreateEditForm.jsx
import React, { useState, useEffect } from "react";
import api from "../../api/api";
import "../../assets/styles/form.css";



export default function CreateEditForm({
  initialData = null,
  category,
  onCreate,
  onUpdate,
  onClose,
}) {
  const isEdit = Boolean(initialData);

  // FORM STATES
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");
  const [tech, setTech] = useState(initialData?.tech?.join(", ") || "");
  const [links, setLinks] = useState(initialData?.links || []);
  const [priority, setPriority] = useState(initialData?.priority || 0);
  const [published, setPublished] = useState(initialData?.published ?? true);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreview, setMediaPreview] = useState(initialData?.media || []);

  const [loading, setLoading] = useState(false);

  // Add a link row
  const addLink = () => setLinks([...links, { label: "", url: "" }]);
  const updateLink = (i, key, value) =>
    setLinks((l) => l.map((item, idx) => (idx === i ? { ...item, [key]: value } : item)));
  const removeLink = (i) => setLinks((l) => l.filter((_, idx) => idx !== i));

  // File input handler
  const handleMediaFiles = (files) => {
    const arr = [...files];
    setMediaFiles((prev) => [...prev, ...arr]);
    setMediaPreview((prev) => [...prev, ...arr.map((f) => ({ local: URL.createObjectURL(f) }))]);
  };

  async function uploadFile(file) {
    const fd = new FormData();
    fd.append("file", file);
    return api.upload("/upload/upload-cloud", fd);

  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try { 
      // upload new files
      const uploads = await Promise.all(
        mediaFiles.map((f) => uploadFile(f))
      );

      const newMedia = uploads
        .filter(Boolean)
        .map((u) => ({
          url: u.url,
          type: u.type,
          public_id: u.public_id,
        }));

      const finalMedia = [
        ...(initialData?.media || []),
        ...newMedia,
      ];

      const payload = {
        title,
        description,
        category,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        tech: tech.split(",").map((t) => t.trim()).filter(Boolean),
        priority: Number(priority),
        published,
        links: links.filter((l) => l.url && l.label),
        media: finalMedia,
      };

      let res;
      if (isEdit) res = await onUpdate(initialData._id, payload);
      else res = await onCreate(payload);

      setLoading(false);
      onClose();uploadFile
      return res;
    } catch (err) {
      console.error("project save error:", err);
      alert(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal large" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h3>{isEdit ? "Edit Project" : "Create Project"}</h3>
          <button className="btn" onClick={onClose}>✕</button>
        </header>

        <form className="form-grid" onSubmit={handleSubmit}>
          <section>
            <label>
              Title
              <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>

            <label>
              Description
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
            </label>

            <label>
              Tags (comma separated)
              <input value={tags} onChange={(e) => setTags(e.target.value)} />
            </label>

            <label>
              Tech (comma separated)
              <input value={tech} onChange={(e) => setTech(e.target.value)} />
            </label>

            <label>
              Priority
              <input type="number" value={priority} onChange={(e) => setPriority(e.target.value)} />
            </label>

            <label className="switch-row">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
              <span>Published</span>
            </label>
          </section>

          <section>
            <label>Media Upload</label>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={(e) => handleMediaFiles(e.target.files)}
            />

            <div className="media-preview-grid">
              {mediaPreview.map((m, i) => (
                <div key={i} className="preview-box">
                  {m.local ? (
                    m.local.endsWith(".mp4") || m.local.includes("video") ? (
                      <video src={m.local} muted loop />
                    ) : (
                      <img src={m.local} alt="preview" />
                    )
                  ) : m.type === "video" ? (
                    <video src={m.url} muted loop />
                  ) : (
                    <img src={m.url} alt="media" />
                  )}
                </div>
              ))}
            </div>

            <label style={{ marginTop: 12 }}>Links</label>
            {links.map((l, i) => (
              <div key={i} className="link-row">
                <input
                  value={l.label}
                  placeholder="Label"
                  onChange={(e) => updateLink(i, "label", e.target.value)}
                />
                <input
                  value={l.url}
                  placeholder="https://..."
                  onChange={(e) => updateLink(i, "url", e.target.value)}
                />
                <button type="button" className="btn small danger" onClick={() => removeLink(i)}>
                  −
                </button>
              </div>
            ))}
            <button type="button" className="btn small" onClick={addLink}>
              + Add Link
            </button>
          </section>

          <footer className="modal-footer">
            <button className="btn" type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button className="btn primary" type="submit" disabled={loading}>
              {loading ? "Saving…" : isEdit ? "Save Changes" : "Create Project"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
