"use client";

import { useDraggable } from "@dnd-kit/core";

const fields = [
  { type: "text", label: "Text Input" },
  { type: "email", label: "Email" },
  { type: "textarea", label: "Textarea" },
  { type: "checkbox", label: "Checkbox" },
];

function DraggableItem({ field }: any) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: field.type,
    data: field,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="border p-2 rounded cursor-move bg-white"
    >
      {field.label}
    </div>
  );
}

export default function ComponentPalette() {
  return (
    <div className="space-y-2">
      {fields.map((f) => (
        <DraggableItem key={f.type} field={f} />
      ))}
    </div>
  );
}
