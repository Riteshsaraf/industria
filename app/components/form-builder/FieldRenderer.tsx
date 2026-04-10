import { FormField } from "@/app/types/form";

export default function FieldRenderer({ field }: { field: FormField }) {
  switch (field.type) {
    case "text":
    case "email":
      return (
        <input
          type={field.type}
          placeholder={field.label}
          className="border p-2 w-full"
        />
      );

    case "textarea":
      return (
        <textarea
          placeholder={field.label}
          className="border p-2 w-full"
        />
      );

    case "checkbox":
      return (
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          {field.label}
        </label>
      );

    default:
      return null;
  }
}
