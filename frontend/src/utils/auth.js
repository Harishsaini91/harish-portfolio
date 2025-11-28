/**
 * auth.js
 * Utility for admin JWT handling on frontend
 */

export function getToken() {
  return localStorage.getItem("admin_token") || null;
}

export function saveToken(token) {
  localStorage.setItem("admin_token", token);
}

export function removeToken() {
  localStorage.removeItem("admin_token");
}

export function isTokenValid() {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Date.now() / 1000;

    if (payload.exp && payload.exp < now) {
      removeToken();
      return false;
    }

    return true;
  } catch (err) {
    console.error("Token parse error", err);
    removeToken();
    return false;
  }
}
