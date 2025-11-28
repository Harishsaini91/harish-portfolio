import React from "react";
import ActiveSection from "../components/ActiveSection/ActiveSection";

/**
 * CreativePage
 */

export default function CreativePage({
  projects,
  isAdmin,
  onCreate,
  onEdit,
  onDelete,
  onOpen,
}) {
  return (
    <ActiveSection
      category="creative"
      projects={projects}
      isAdmin={isAdmin}
      onCreate={onCreate}
      onEdit={onEdit}
      onDelete={onDelete}
      onOpen={onOpen}
    />
  );
}
