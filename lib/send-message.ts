import type { ContactMessage } from "./contact";

const reasonLabel = { hiring: "Hiring", website: "After a website", hi: "Just saying hi", "": "Not given" };

export class NotConfiguredError extends Error {}

/**
 * Sends a contact message to Michaela through Resend's HTTP API.
 * Needs RESEND_API_KEY, CONTACT_FROM (an address on a domain verified in
 * Resend) and CONTACT_TO. Server only: never import this into a client file.
 */
export async function sendMessage(message: ContactMessage) {
  const { RESEND_API_KEY: key, CONTACT_FROM: from, CONTACT_TO: to } = process.env;
  if (!key || !from || !to) throw new NotConfiguredError("Resend is not configured");

  /* Show the visitor's name in the inbox; the address stays ours so it passes SPF/DKIM */
  const address = from.match(/<([^>]+)>/)?.[1] ?? from;
  const name = message.name.replace(/["<>\r\n]/g, "").trim();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `"${name} via Portfolio" <${address}>`,
      to: [to],
      reply_to: message.email,
      subject: `Portfolio message from ${message.name}`,
      text: [
        `From: ${message.name} <${message.email}>`,
        `I'm: ${reasonLabel[message.reason]}`,
        "",
        message.message,
      ].join("\n"),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) throw new Error(`Resend responded ${response.status}`);
}
