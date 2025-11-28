import React, { useState } from "react";
import api from "../../api/api";
import "../../assets/styles/form.css";

/**
 * IntroEditForm
 * Props:
 * - initialData
 * - onClose()
 * - onSaved(updatedIntro)
 */

export default function IntroEditForm({ initialData, onClose, onSaved }) {
  const [name, setName] = useState(initialData.name || "");
  const [bioLines, setBioLines] = useState(initialData.bioLines || [""]);
  const [links, setLinks] = useState(initialData.links || []);
  const [resumeUrl, setResumeUrl] = useState(initialData.resumeUrl || "");
  const [contactEmail, setContactEmail] = useState(initialData.contactEmail || "");

  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(initialData.profileImage?.url || "");

  const [bgFile, setBgFile] = useState(null);
  const [bgPreview, setBgPreview] = useState(initialData.backgroundMedia?.url || "");

  const [saving, setSaving] = useState(false);

  const addBio = () => setBioLines([...bioLines, ""]);
  const removeBio = (i) => setBioLines(bioLines.filter((_, idx) => idx !== i));
  const updateBio = (i, v) =>
    setBioLines(bioLines.map((b, idx) => (idx === i ? v : b)));

  const addLink = () => setLinks([...links, { label: "", url: "" }]);
  const updateLink = (i, k, v) =>
    setLinks(links.map((l, idx) => (idx === i ? { ...l, [k]: v } : l)));
  const removeLink = (i) => setLinks(links.filter((_, idx) => idx !== i));

  async function upload(file) {
    const fd = new FormData();
    fd.append("file", file);
    return api.upload("/upload/upload-cloud", fd); // ⛳ correct endpoint
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true);

    try {
      // Uploads
      let profileUpload = profileFile ? await upload(profileFile) : initialData.profileImage;
      let bgUpload = bgFile ? await upload(bgFile) : initialData.backgroundMedia;

      // Payload
      const payload = {
        name,
        bioLines: bioLines.filter((b) => b.trim() !== ""),
        links: links.filter((l) => l.label && l.url),
        resumeUrl,
        contactEmail,
        profileImage: profileUpload,
        backgroundMedia: bgUpload,
      };

      const updated = await api.put("/intro", payload);
      onSaved(updated);
    } catch (err) {
      alert(err.message);
    }

    setSaving(false);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal large" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h3>Edit Intro</h3>
          <button className="btn small" onClick={onClose}>✕</button>
        </header>

        <form className="form-grid" onSubmit={save}>

          {/* NAME */}
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>

          {/* BIO LINES */}
          <label>Bio Lines</label>
          {bioLines.map((b, i) => (
            <div className="link-row" key={i}>
              <input
                value={b}
                onChange={(e) => updateBio(i, e.target.value)}
                placeholder={`Bio line ${i + 1}`}
              />
              <button type="button" className="btn small danger" onClick={() => removeBio(i)}>−</button>
            </div>
          ))}
          <button type="button" className="btn small" onClick={addBio}>
            + Add Bio Line
          </button>

          {/* PROFILE IMAGE */}
          <label>
            Profile Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setProfileFile(e.target.files[0]);
                setProfilePreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </label>
          {profilePreview && <img src={profilePreview} className="preview-sm" alt="" />}

          {/* BACKGROUND MEDIA */}
          <label>
            Background Media (image/video)
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => {
                setBgFile(e.target.files[0]);
                setBgPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </label>
          {bgPreview && (
            bgPreview.includes("video") || bgPreview.endsWith(".mp4") ? (
              <video src={bgPreview} className="preview-md" muted loop />
            ) : (
              <img src={bgPreview} className="preview-md" alt="" />
            )
          )}

          {/* LINKS */}
          <label>Links</label>
          {links.map((l, i) => (
            <div key={i} className="link-row"> 
              <input
                placeholder="Label"
                value={l.label}
                onChange={(e) => updateLink(i, "label", e.target.value)}
              />
              <input
                placeholder="https://..."
                value={l.url}
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

          {/* CONTACT & RESUME */}
          <label>
            Resume URL
            <input value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} />
          </label>

          <label>
            Contact Email
            <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
          </label>

          <footer className="modal-footer">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn primary" disabled={saving}>
              {saving ? "Saving…" : "Save Intro"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
