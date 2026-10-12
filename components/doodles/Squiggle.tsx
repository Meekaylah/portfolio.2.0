import { Doodle, Stroke } from "./Doodle";

export function Squiggle({ className, delay }: { className?: string; delay?: number }) {
  return (
    <Doodle className={className} delay={delay} width={140} height={40} viewBox="0 0 140 40">
      <Stroke d="M4 26 C16 6 26 6 32 20 C38 34 50 34 56 18 C62 4 76 6 80 22 C84 36 98 34 104 18 C110 6 124 8 136 20" className="fill-none stroke-pink" strokeWidth={3} strokeLinecap="round" />
    </Doodle>
  );
}
