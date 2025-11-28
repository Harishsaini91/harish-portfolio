import React, { createContext, useEffect, useMemo, useState } from "react";

/**
 * ThemeContext — provides theme object and setThemeId(themeId)
 * Default themes are defined here; you can later move them to DB or a config file.
 */

const DEFAULT_THEMES = {
  webdev: {
    id: "webdev",
    name: "Web Development",
    className: "theme-webdev",
    accent: "#06b6d4",
  },
  sketch: {
    id: "sketch",
    name: "Sketches",
    className: "theme-sketch",
    accent: "#805ad5",
  },
  creative: {
    id: "creative",
    name: "Creative",
    className: "theme-creative",
    accent: "#ff6b6b",
  },
};

export const ThemeContext = createContext({
  theme: DEFAULT_THEMES.webdev,
  setThemeId: () => {},
  themes: DEFAULT_THEMES,
});

export function ThemeProvider({ children, initial = "webdev", themes = DEFAULT_THEMES }) {
  const [themeId, setThemeId] = useState(initial);
  const theme = useMemo(() => themes[themeId] || themes.webdev, [themes, themeId]);

  useEffect(() => {
    // apply theme class to body for CSS scoping
    Object.values(themes).forEach((t) => document.body.classList.remove(t.className));
    document.body.classList.add(theme.className);
    document.documentElement.style.setProperty("--accent-color", theme.accent || "#06b6d4");
  }, [theme, themes]);

  const api = { theme, setThemeId, themes };
  return <ThemeContext.Provider value={api}>{children}</ThemeContext.Provider>;
}
