/**
 * theme.js
 * Theme mapping and helper functions
 *
 * Theme classNames:
 * - theme-webdev
 * - theme-sketch
 * - theme-creative
 */

export const THEMES = {
  webdev: {
    name: "Web Development",
    className: "theme-webdev",
  },
  sketch: {
    name: "Sketches",
    className: "theme-sketch",
  },
  creative: {
    name: "Creative",
    className: "theme-creative",
  },
};

export function getTheme(category) {
  return THEMES[category] || THEMES.webdev;
}
