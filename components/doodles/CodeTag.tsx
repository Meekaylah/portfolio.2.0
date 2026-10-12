import { Doodle, Stroke } from "./Doodle";

export function CodeTag({ className, delay }: { className?: string; delay?: number }) {
  return (
    <Doodle className={className} delay={delay} width={110} height={70} viewBox="0 0 110 70">
      <Stroke d="M30 14 L8 35 L30 56" className="fill-none stroke-ink" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <Stroke d="M80 14 L102 35 L80 56" className="fill-none stroke-ink" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <Stroke d="M64 8 L46 62" className="fill-none stroke-pink" strokeWidth={3} strokeLinecap="round" />
    </Doodle>
  );
}
