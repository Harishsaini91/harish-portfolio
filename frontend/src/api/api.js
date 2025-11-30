// lightweight API client wrapper (fetch-based)
// - attaches Authorization header from localStorage.admin_token if present
// - supports json bodies via { jsonBody: {...} }
// - throws Error on non-OK responses with useful message

// const API_BASE = process.env.REACT_APP_API || "http://localhost:5000/api";
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";


async function request(path, opts = {}) {
  const url = `${API_BASE}${path}`;
  const headers = opts.headers ? { ...opts.headers } : {};
  const token = localStorage.getItem("admin_token");
  if (token) headers.Authorization = `Bearer ${token}`;

  const fetchOpts = { method: opts.method || "GET", headers };

  if (opts.jsonBody) {
    fetchOpts.headers = { ...fetchOpts.headers, "Content-Type": "application/json" };
    fetchOpts.body = JSON.stringify(opts.jsonBody);
  } else if (opts.body) {
    fetchOpts.body = opts.body; // FormData or other body
  }

  const res = await fetch(url, fetchOpts);
  const text = await res.text().catch(() => "");
  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    let message = text || res.statusText || `HTTP ${res.status}`;
    try {
      if (contentType.includes("application/json")) {
        const j = JSON.parse(text);
        message = j.error || j.message || message;
      }
    } catch (e) {}
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }

  if (contentType.includes("application/json")) return JSON.parse(text);
  return text;
}

export async function apiGet(path) {
  return request(path, { method: "GET" });
}
export async function apiPost(path, jsonBody) {
  return request(path, { method: "POST", jsonBody });
}
export async function apiPut(path, jsonBody) {
  return request(path, { method: "PUT", jsonBody });
}
export async function apiDelete(path) {
  return request(path, { method: "DELETE" });
}

// for file uploads (FormData), return parsed JSON
export async function uploadToServer(path, formData) {
  return request(path, { method: "POST", body: formData });
}

export default {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  del: apiDelete,
  upload: uploadToServer,
};
