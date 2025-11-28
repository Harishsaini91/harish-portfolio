import React from "react";
import "../../assets/styles/loader.css";

export default function Loader({ size = 38 }) {
  return (
    <div className="loader" style={{ width: size, height: size }}>
      <div className="spinner" />
    </div>
  );
}
