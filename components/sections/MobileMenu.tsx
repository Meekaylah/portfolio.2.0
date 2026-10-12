"use client";

import { useRef, useState } from "react";

export type MenuLink = { label: string; href: string | null };

/* Below 720px the side links fold into this. A native modal <dialog> traps
   focus, closes on Esc and hands focus back to the Menu button. */
export function MobileMenu({ links }: { links: MenuLink[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="btn-outline"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
      >
        Menu
      </button>

      <dialog
        ref={dialog}
        aria-label="Menu"
        className="m-0 w-full max-w-none border-b-[1.5px] border-ink bg-paper px-6 pt-7 pb-10 text-ink backdrop:bg-ink/40"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="flex justify-end">
          <button type="button" className="btn-outline" onClick={() => dialog.current?.close()}>
            Close
          </button>
        </div>
        <nav aria-label="Primary">
          <ul className="mt-4 flex flex-col">
            {links.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <a
                    href={link.href}
                    className="flex min-h-14 items-center font-display text-h3 transition-colors duration-150 hover:text-rose"
                    onClick={() => dialog.current?.close()}
                  >
                    {link.label}
                  </a>
                ) : (
                  <span className="flex min-h-14 items-center font-display text-h3">{link.label}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </dialog>
    </>
  );
}
