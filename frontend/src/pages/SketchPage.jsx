import React from "react";
import ActiveSection from "../components/ActiveSection/ActiveSection";

/**
 * SketchPage
 */

export default function SketchPage({
  projects,
  isAdmin,
  onCreate,
  onEdit,
  onDelete,
  onOpen,
}) {
  return (
    <ActiveSection
      category="sketch"
      projects={projects}
      isAdmin={isAdmin}
      onCreate={onCreate}
      onEdit={onEdit}
      onDelete={onDelete}
      onOpen={onOpen}
    />
  );
}
