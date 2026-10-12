import { Doodle, Stroke } from "./Doodle";

export function Checkbox({ className, delay }: { className?: string; delay?: number }) {
  return (
    <Doodle className={className} delay={delay} width={70} height={70} viewBox="0 0 70 70">
      <Stroke d="M10 14 C24 11 46 12 58 12 C59 26 59 44 58 58 C42 59 24 59 11 58 C10 42 10 28 10 14 Z" className="fill-sage stroke-ink" strokeWidth={2.6} strokeLinejoin="round" />
      <Stroke d="M20 34 L32 46 L64 6" className="fill-none stroke-pink" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
    </Doodle>
  );
}
