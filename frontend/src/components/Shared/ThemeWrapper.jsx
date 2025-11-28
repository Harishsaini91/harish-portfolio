import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

/**
 * ThemeWrapper
 * Wraps any component and applies theme.className
 */

export default function ThemeWrapper({ children }) {
  const { theme } = useContext(ThemeContext);
  return <div className={`theme-wrapper ${theme.className}`}>{children}</div>;
}
