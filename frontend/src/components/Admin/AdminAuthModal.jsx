// frontend/src/components/Admin/AdminAuthModal.jsx
import React, { useEffect, useState } from "react";
import "../../assets/styles/modal.css";
import "../../assets/styles/form.css";
import api from "../../api/api";

export default function AdminAuthModal({ onClose, onSuccess }) {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if admin exists
  useEffect(() => {
    api
      .get("/auth/exists")
      .then((res) => {
        if (res.exists === false) {
          setMode("register");
        }
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      if (mode === "register") {
        const res = await api.post("/auth/register", { email, password });
        if (res.message) {
          alert("Admin registered. Please login now.");
          setMode("login");
          setLoading(false);
          return;
        }
      }

      // LOGIN
      const res = await api.post("/auth/login", { email, password });

      if (!res.token) throw new Error("Login failed: no token returned");

      localStorage.setItem("admin_token", res.token);
      onSuccess();
    } catch (e) {
      setErr(e.response?.data?.error || e.message || "Request failed");
    }

    setLoading(false);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal small" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h3>{mode === "register" ? "Create Admin Account" : "Admin Login"}</h3>
          <button className="btn small" onClick={onClose}>
            ✕
          </button>
        </header>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {err && <div className="form-error">{err}</div>}

          <button className="btn primary" disabled={loading} type="submit">
            {loading
              ? "Please wait..."
              : mode === "register"
              ? "Register Admin"
              : "Login"}
          </button>
        </form>

        <div className="auth-switch">
          {mode === "login" && (
            <p>
              No account? <button onClick={() => setMode("register")}>Register</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
