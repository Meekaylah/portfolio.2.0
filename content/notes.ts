export type Note = {
  id: string;
  name: string;
  /** Shown under the name in the "From" list, e.g. "Manager · Company". */
  relationship: string;
  /** Shown under the signature, e.g. "Their role, Company · how you worked together". */
  role: string;
  /** e.g. "March 2026". */
  date: string;
  /** Their words, exactly as they wrote them. */
  quote: string;
  link?: { label: string; href: string };
};

/* Add notes here as they arrive. The section adapts to 0, 1 or 2+ notes. */
export const notes: Note[] = [];
