/* The contact form's shape and rules, shared by the form (for instant
   feedback) and the route handler (which never trusts the browser). */

export const reasons = ["hiring", "website", "hi"] as const;
export type Reason = (typeof reasons)[number];

export type ContactMessage = {
  name: string;
  email: string;
  reason: Reason | "";
  message: string;
};

export type ContactField = keyof ContactMessage;
export type ContactErrors = Partial<Record<ContactField, string>>;

/** Name of the hidden field people never see. Bots that fill it are ignored. */
export const honeypot = "company";

const limits = { name: 100, email: 200, message: 5000 };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(
  input: unknown,
): { ok: true; data: ContactMessage } | { ok: false; errors: ContactErrors } {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const text = (key: string) => (typeof raw[key] === "string" ? (raw[key] as string).trim() : "");

  const data: ContactMessage = {
    name: text("name"),
    email: text("email"),
    reason: reasons.includes(text("reason") as Reason) ? (text("reason") as Reason) : "",
    message: text("message"),
  };

  const errors: ContactErrors = {};
  if (!data.name) errors.name = "Please tell me your name.";
  else if (data.name.length > limits.name) errors.name = `Please keep your name under ${limits.name} characters.`;

  if (!data.email) errors.email = "Please add an email so I can reply.";
  else if (data.email.length > limits.email || !emailPattern.test(data.email))
    errors.email = "That email doesn't look quite right.";

  if (!data.message) errors.message = "Please write a short message.";
  else if (data.message.length > limits.message)
    errors.message = `Please keep it under ${limits.message} characters.`;

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
