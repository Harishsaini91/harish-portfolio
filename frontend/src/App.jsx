import React, { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import api from "./api/api";
import "./assets/styles/main.css";

/**
 * App.jsx — Thin root component.
 * - orchestrates initial fetch of intro + projects
 * - holds top-level state (intro, projects, auth, activeCategory)
 * - exposes handlers (create/update/delete) and modal toggles via props to children
 *
 * Note: real UI components (IntroSection, Navbar, ActiveSection, AdminAuthModal, CreateEditForm, ProjectModal)
 * should be created under src/components/ as we planned. This App imports them if present; otherwise it falls
 * back to tiny inline placeholders so your dev server won't crash.
 */

import IntroSection from "./components/Intro/IntroSection.jsx"; // create these later
import Navbar from "./components/Navbar/Navbar.jsx";
import ActiveSection from "./components/ActiveSection/ActiveSection.jsx";
import AdminAuthModal from "./components/Admin/AdminAuthModal.jsx";
import CreateEditForm from "./components/ActiveSection/CreateEditForm.jsx";
import ProjectModal from "./components/ActiveSection/ProjectModal.jsx";

// Fallbacks if components missing (keeps app runnable)
function Fallback({ children, label }) {
  return <div style={{ padding: 20, border: "1px dashed #ccc", margin: 12 }}>{children || <div>{label} (placeholder)</div>}</div>;
}

export default function App() { 
  const [intro, setIntro] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [activeCategory, setActiveCategory] = useState("webdev");
  const [isAdmin, setIsAdmin] = useState(Boolean(localStorage.getItem("admin_token")));
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [showCreateEdit, setShowCreateEdit] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // derived filtered projects
  const activeProjects = useMemo(
    () => projects.filter((p) => p.category === activeCategory && p.published !== false),
    [projects, activeCategory]
  );


// Check if admin exists — if not, open register modal immediately
useEffect(() => {
  api
    .get("/auth/exists")
    .then((res) => {
      if (!res.exists) {
        // No admin in DB → open register modal
        setShowAdminAuth(true);
      }
    })
    .catch(() => {});
}, []);


  useEffect(() => {
    let mounted = true; 
    setLoading(true);
    Promise.allSettled([api.get("/intro"), api.get("/projects")])
      .then((results) => {
        if (!mounted) return;
        const introRes = results[0].status === "fulfilled" ? results[0].value : null;
        const projectsRes = results[1].status === "fulfilled" ? results[1].value : [];
        setIntro(introRes);
        setProjects(Array.isArray(projectsRes) ? projectsRes : projectsRes.data || []);
      })
      .catch((e) => console.error("Init error", e))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);


  }, []);

  // AUTH (login handled in AdminAuthModal component — after login set isAdmin true)
  function handleLoginSuccess() {
    setIsAdmin(true);
    setShowAdminAuth(false);
  }
  function logout() {
    localStorage.removeItem("admin_token");
    setIsAdmin(false);
  }

  // CRUD handlers — these call the API and update local state
  async function createProject(payload) {
    const res = await api.post("/projects", payload);
    setProjects((p) => [res, ...p]);
    setShowCreateEdit(false);
    return res;
  }
  async function updateProject(id, payload) {
    const res = await api.put(`/projects/${id}`, payload);
    setProjects((old) => old.map((o) => (o._id === id ? res : o)));
    setShowCreateEdit(false);
    setEditingProject(null);
    return res;
  }
  async function deleteProject(id) {
    await api.del(`/projects/${id}`);
    setProjects((old) => old.filter((p) => p._id !== id));
  }
  async function updateIntro(payload) {
    const res = await api.put("/intro", payload);
    setIntro(res);
    return res;
  }

  // UI helpers
  function openCreate() {
    setEditingProject(null);
    setShowCreateEdit(true);
  }
  function openEdit(p) {
    setEditingProject(p);
    setShowCreateEdit(true);
  }
  function openProjectModal(p) {
    setSelectedProject(p);
  }
  function closeProjectModal() {
    setSelectedProject(null);
  }

  return (
    <ThemeProvider initial={activeCategory}>
      <div className="app-root">
        {/* Intro */}
        {IntroSection ? (
          <IntroSection intro={intro} isAdmin={isAdmin} onUpdateIntro={updateIntro} onEdit={() => setShowCreateEdit(true)} />
        ) : (
          <Fallback label="IntroSection">
            <pre>{JSON.stringify(intro || {}, null, 2)}</pre>
          </Fallback>
        )}

        {/* Navbar */}
        {Navbar ? (
          <Navbar active={activeCategory} setActive={setActiveCategory} />
        ) : (
          <Fallback label="Navbar" />
        )}

        {/* Active Section */}
        {ActiveSection ? (
          <ActiveSection
            projects={activeProjects}
            isAdmin={isAdmin}
            onCreate={openCreate}
            onEdit={openEdit}
            onDelete={deleteProject}
            onOpen={openProjectModal}
            category={activeCategory}
          />
        ) : (
          <Fallback label="ActiveSection" />
        )}

        {/* Modals */}
        {showAdminAuth && AdminAuthModal ? (
          <AdminAuthModal onClose={() => setShowAdminAuth(false)} onSuccess={handleLoginSuccess} />
        ) : (
          showAdminAuth && <Fallback label="AdminAuthModal" />
        )}

        {showCreateEdit && CreateEditForm ? (
          <CreateEditForm
            initialData={editingProject}
            category={activeCategory}
            onCreate={createProject}
            onUpdate={updateProject}
            onClose={() => setShowCreateEdit(false)}
            upload={null} // pass upload helper from a dedicated UploadDropzone later
          />
        ) : null}

        {selectedProject && ProjectModal ? (
          <ProjectModal project={selectedProject} onClose={closeProjectModal} isAdmin={isAdmin} onEdit={openEdit} onDelete={deleteProject} />
        ) : null}

        {/* small admin toolbar */}
        <div className="admin-toolbar">
          {!isAdmin ? (
            <button className="btn" onClick={() => setShowAdminAuth(true)}>
              Admin Login
            </button>
          ) : (
            <>
              <button className="btn danger" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>

        {loading && <div className="loading-overlay">Loading…</div>}
      </div>
    </ThemeProvider>
  );
}
 