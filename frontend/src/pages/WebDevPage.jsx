import React from "react";
import ActiveSection from "../components/ActiveSection/ActiveSection";

/**
 * WebDevPage
 * Receives all props directly from App.jsx
 * 
 * Props:
 * - projects
 * - isAdmin
 * - onCreate
 * - onEdit
 * - onDelete
 * - onOpen
 */

export default function WebDevPage({
  projects,
  isAdmin,
  onCreate,
  onEdit,
  onDelete,
  onOpen,
}) {
  return (
    <ActiveSection
      category="webdev"
      projects={projects}
      isAdmin={isAdmin}
      onCreate={onCreate}
      onEdit={onEdit}
      onDelete={onDelete}
      onOpen={onOpen}
    />
  );
}
