import { site } from "@/content/site";

/* "michaela.dev" with its hand-drawn underline. Size and colours come from the caller. */
export function Wordmark({
  className = "",
  underlineClassName = "",
  underlineWidth = 84,
  underlineHeight = 10,
}: {
  className?: string;
  underlineClassName?: string;
  underlineWidth?: number;
  underlineHeight?: number;
}) {
  return (
    <span className={`inline-flex flex-col font-display ${className}`}>
      <span>{site.wordmark}</span>
      <svg
        aria-hidden="true"
        focusable="false"
        width={underlineWidth}
        height={underlineHeight}
        viewBox="0 0 84 10"
        className={underlineClassName}
      >
        <path d="M2 6 C 18 2, 36 9, 52 4 S 74 3, 82 6" className="fill-none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
      </svg>
    </span>
  );
}
