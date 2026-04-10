"use client";

import { useDroppable } from "@dnd-kit/core";
import { FormField } from "@/app/types/form";

export default function FormCanvas({
  fields,
}: {
  fields: FormField[];
}) {
  const { setNodeRef } = useDroppable({
    id: "form-canvas",
  });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[400px] border-2 border-dashed p-4 rounded"
    >
      {fields.length === 0 && (
        <p className="text-gray-400">Drop fields here</p>
      )}

      {fields.map((f) => (
        <div key={f.id} className="border p-2 rounded mb-2">
          {f.label} ({f.type})
        </div>
      ))}
    </div>
  );
}
