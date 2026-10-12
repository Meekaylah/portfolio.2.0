import { honeypot, validateContact } from "@/lib/contact";
import { NotConfiguredError, sendMessage } from "@/lib/send-message";

const maxBytes = 10_000;

/* POST /api/contact: validates the message again on the server, quietly
   drops anything that filled the honeypot, and passes the rest to Resend. */
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  if (Number(request.headers.get("content-length") ?? 0) > maxBytes) {
    return Response.json({ error: "Message too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  /* A bot filled the hidden field: pretend it worked, send nothing */
  if (body && typeof body === "object" && (body as Record<string, unknown>)[honeypot]) {
    return Response.json({ ok: true });
  }

  const result = validateContact(body);
  if (!result.ok) return Response.json({ errors: result.errors }, { status: 400 });

  try {
    await sendMessage(result.data);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form:", error instanceof Error ? error.message : error);
    const status = error instanceof NotConfiguredError ? 503 : 502;
    return Response.json({ error: "Could not send" }, { status });
  }
}
