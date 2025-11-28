/**
 * format.js
 * Misc formatting utilities for projects & UI
 */

export function trimText(text, limit = 120) {
  if (!text) return "";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}

export function toArray(str) {
  if (!str) return [];
  return str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

// Safe text (prevent XSS if showing raw strings)
export function safe(text = "") {
  return String(text).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Convert links array to nice formatted list
export function normalizeLinks(arr = []) {
  return arr.filter((l) => l.label && l.url);
}
