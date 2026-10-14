"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { honeypot, validateContact, type ContactErrors, type ContactField } from "@/lib/contact";
import type { SiteContent } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";
type FormCopy = SiteContent["contact"]["form"];

const field =
  "min-h-11 w-full rounded-button border-[1.5px] bg-paper px-3.5 py-2.5 text-body text-ink transition-colors duration-150 placeholder:text-ink-muted focus-visible:border-ink";
const order: ContactField[] = ["name", "email", "message"];

/* There is one dialog on the page and every MessageButton opens it, so a
   half-written message is still there whichever button brings you back. */
let showDialog: (() => void) | null = null;
let dialogOpen = false;
const listeners = new Set<() => void>();
function setDialogOpen(open: boolean) {
  dialogOpen = open;
  listeners.forEach((listener) => listener());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Opens the "Leave a message" dialog. In the closing sentence it is styled
 * as a link; "Say hello" and "Tell me about your project" are solid buttons.
 */
export function MessageButton({ className, children = "leave a message" }: { className?: string; children?: ReactNode }) {
  const open = useSyncExternalStore(subscribe, () => dialogOpen, () => false);
  return (
    <button type="button" aria-haspopup="dialog" aria-expanded={open} className={`${className} cursor-pointer`} onClick={() => showDialog?.()}>
      {children}
    </button>
  );
}

/**
 * "Leave a message": a native modal dialog with a short form, rendered once
 * for the whole page. It traps focus, closes on Esc and returns focus to the
 * button that opened it. It is portalled to <body> so it sits outside every
 * section.
 */
export function MessageDialog({ copy, email }: { copy: FormCopy; email: string | null }) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const sentHeading = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [reason, setReason] = useState("");
  const inBrowser = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const messageLabel = copy.reasons.find((r) => r.value === reason)?.messageLabel ?? copy.defaultMessageLabel;

  useEffect(() => {
    showDialog = () => {
      setStatus((current) => (current === "sent" || current === "error" ? "idle" : current));
      dialog.current?.showModal();
      setDialogOpen(true);
    };
    return () => {
      showDialog = null;
    };
  }, []);

  function close() {
    dialog.current?.close();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const values = Object.fromEntries(new FormData(event.currentTarget));

    const result = validateContact(values);
    if (!result.ok) {
      setErrors(result.errors);
      const first = order.find((name) => result.errors[name]);
      if (first) (event.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, [honeypot]: values[honeypot] ?? "" }),
      });
      if (response.status === 400) {
        const body = (await response.json().catch(() => ({}))) as { errors?: ContactErrors };
        if (body.errors) {
          setErrors(body.errors);
          setStatus("idle");
          return;
        }
      }
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
      form.current?.reset();
      setReason("");
      requestAnimationFrame(() => sentHeading.current?.focus());
    } catch {
      setStatus("error");
    }
  }

  const describedBy = (name: ContactField) => (errors[name] ? `${id}-${name}-error` : undefined);
  const errorText = (name: ContactField) =>
    errors[name] && (
      <p id={`${id}-${name}-error`} className="mt-1.5 text-caption text-rose">
        {errors[name]}
      </p>
    );
  const border = (name: ContactField) => (errors[name] ? "border-rose" : "border-line");

  return (
    <>
      {inBrowser &&
        createPortal(
          <dialog
            ref={dialog}
            aria-labelledby={`${id}-title`}
            className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-media border border-line bg-paper-raised p-0 text-left text-ink backdrop:bg-ink/60"
            onClose={() => setDialogOpen(false)}
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <h2 id={`${id}-title`} className="text-h3">
                  {copy.title}
                </h2>
                <button type="button" className="btn-outline" onClick={close}>
                  Close
                </button>
              </div>

              {status === "sent" ? (
                <div className="mt-4">
                  <h3 ref={sentHeading} tabIndex={-1} className="text-title">
                    Sent.
                  </h3>
                  <p className="mt-2 text-body text-ink-soft" role="status">
                    {copy.sent}
                  </p>
                  <button type="button" className="btn mt-6" onClick={close}>
                    Done
                  </button>
                </div>
              ) : (
                <form ref={form} noValidate className="mt-2" onSubmit={submit}>
                  <p className="text-small text-ink-soft">{copy.intro}</p>

                  <div className="mt-5 flex flex-col gap-4">
                    <div>
                      <label htmlFor={`${id}-name`} className="text-small font-medium">
                        Name
                      </label>
                      <input
                        id={`${id}-name`}
                        name="name"
                        autoComplete="name"
                        autoFocus
                        required
                        aria-invalid={!!errors.name}
                        aria-describedby={describedBy("name")}
                        className={`mt-1.5 ${field} ${border("name")}`}
                      />
                      {errorText("name")}
                    </div>

                    <div>
                      <label htmlFor={`${id}-email`} className="text-small font-medium">
                        Email
                      </label>
                      <input
                        id={`${id}-email`}
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby={describedBy("email")}
                        className={`mt-1.5 ${field} ${border("email")}`}
                      />
                      {errorText("email")}
                    </div>

                    <fieldset>
                      <legend className="text-small font-medium">I&apos;m…</legend>
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        {copy.reasons.map((option) => (
                          <label
                            key={option.value}
                            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-button border-[1.5px] border-line bg-paper px-3.5 text-small transition-colors duration-150 hover:border-ink has-checked:border-ink has-checked:bg-blush has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-pink"
                          >
                            <input
                              type="radio"
                              name="reason"
                              value={option.value}
                              checked={reason === option.value}
                              onChange={() => setReason(option.value)}
                              className="size-3.5 accent-ink"
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div>
                      <label htmlFor={`${id}-message`} className="text-small font-medium">
                        {messageLabel}
                      </label>
                      <textarea
                        id={`${id}-message`}
                        name="message"
                        rows={5}
                        required
                        aria-invalid={!!errors.message}
                        aria-describedby={describedBy("message")}
                        className={`mt-1.5 block resize-y ${field} ${border("message")}`}
                      />
                      {errorText("message")}
                    </div>

                    {/* Hidden from people; bots that fill it in are ignored */}
                    <div aria-hidden="true" className="absolute left-[-9999px] size-px overflow-hidden">
                      <label htmlFor={`${id}-${honeypot}`}>Company</label>
                      <input id={`${id}-${honeypot}`} name={honeypot} tabIndex={-1} autoComplete="off" />
                    </div>
                  </div>

                  {status === "error" && (
                    <p role="alert" className="mt-5 text-small text-rose">
                      Sorry, that didn&apos;t send. Please try again in a moment
                      {email ? (
                        <>
                          , or email me at{" "}
                          <a href={`mailto:${email}`} className="link-mark">
                            {email}
                          </a>
                        </>
                      ) : null}
                      .
                    </p>
                  )}

                  <div className="mt-6 flex items-center gap-4">
                    <button type="submit" className="btn disabled:opacity-70" disabled={status === "sending"} aria-disabled={status === "sending"}>
                      {status === "sending" ? "Sending…" : "Send"}
                    </button>
                    <p aria-live="polite" className="sr-only">
                      {status === "sending" ? "Sending your message" : ""}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </dialog>,
          document.body,
        )}
    </>
  );
}
