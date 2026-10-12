import type { Metadata } from "next";
import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 pt-7 pb-16 text-center">
      <Link href="/" aria-label="Back to the homepage" className="transition-colors duration-150 hover:text-rose">
        <Wordmark className="items-center text-[2rem]" underlineClassName="-mt-[3px] text-pink" />
      </Link>

      <div className="flex flex-1 flex-col items-center justify-center py-16">
        {/* The hero's paper plane, flown off course */}
        <svg aria-hidden="true" focusable="false" width={100} height={70} viewBox="0 0 100 70" className="-rotate-12">
          <path d="M6 34 L94 6 L58 64 L44 42 Z" className="fill-paper-raised stroke-ink" strokeWidth={2.6} strokeLinejoin="round" />
          <path d="M44 42 L94 6" className="fill-none stroke-ink" strokeWidth={2.6} strokeLinecap="round" />
        </svg>
        <h1 className="mt-8 text-h2">Page not found</h1>
        <p className="mt-4 max-w-115 text-lead text-ink-soft">
          The page you&apos;re looking for isn&apos;t here. It may have moved, or the link may have a typo.
        </p>
        <Link href="/" className="btn mt-8">
          Back to the homepage
        </Link>
      </div>
    </main>
  );
}
