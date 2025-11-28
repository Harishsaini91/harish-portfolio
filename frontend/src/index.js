import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/styles/main.css";

/**
 * Entry point
 * - Renders App into #root (public/index.html must have <div id="root"></div>)
 */

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
   