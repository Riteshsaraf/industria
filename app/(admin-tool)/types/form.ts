export type FieldType =
  | "text"
  | "email"
  | "number"
  | "textarea"
  | "checkbox";

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  options?: string[];
}
