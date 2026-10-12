/* The little scene the hero sits on. Static: nothing here draws in or moves. */

export function Plant({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" width={90} height={120} viewBox="0 0 90 120" className={className}>
      <path d="M45 70 C44 50 46 30 48 10" className="fill-none stroke-ink" strokeWidth={2.6} strokeLinecap="round" />
      <path d="M45 66 C40 50 30 40 14 36 C20 52 30 62 45 66 Z" className="fill-sage stroke-ink" strokeWidth={2.6} strokeLinejoin="round" />
      <path d="M46 56 C50 40 62 30 80 26 C74 44 62 54 46 56 Z" className="fill-sage stroke-ink" strokeWidth={2.6} strokeLinejoin="round" />
      <path d="M47 24 C40 18 38 10 40 2 C48 6 50 14 47 24 Z" className="fill-sage stroke-ink" strokeWidth={2.6} strokeLinejoin="round" />
      <path d="M20 72 L70 72 L63 116 L27 116 Z" className="fill-petal stroke-ink" strokeWidth={2.6} strokeLinejoin="round" />
    </svg>
  );
}

export function MugAndBooks({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" width={140} height={112} viewBox="0 0 140 112" className={className}>
      <path d="M60 22 C56 16 64 12 60 4" className="fill-none stroke-ink-quiet" strokeWidth={2} strokeLinecap="round" />
      <path d="M74 22 C70 16 78 12 74 4" className="fill-none stroke-ink-quiet" strokeWidth={2} strokeLinecap="round" />
      <path d="M50 28 L86 28 L83 56 L53 56 Z" className="fill-paper-raised stroke-ink" strokeWidth={2.6} strokeLinejoin="round" />
      <path d="M85 34 C98 34 97 50 84 50" className="fill-none stroke-ink" strokeWidth={2.6} strokeLinecap="round" />
      <path d="M22 56 L112 56 L112 80 L22 80 Z" className="fill-sage stroke-ink" strokeWidth={2.6} strokeLinejoin="round" />
      <path d="M10 80 L122 80 L122 106 L10 106 Z" className="fill-butter stroke-ink" strokeWidth={2.6} strokeLinejoin="round" />
      <path d="M30 93 L80 93" className="stroke-ink" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

export function GroundLine({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" width="100%" height={12} viewBox="0 0 1200 12" preserveAspectRatio="none" className={className}>
      <path d="M2 6 C300 3 700 10 1198 5" className="fill-none stroke-ink" strokeWidth={2.6} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
