import { Doodle, Stroke } from "./Doodle";

export function Cursor({ className, delay }: { className?: string; delay?: number }) {
  return (
    <Doodle className={className} delay={delay} width={60} height={70} viewBox="0 0 60 70">
      <Stroke d="M8 6 L10 58 L24 44 L34 64 L44 59 L34 40 L52 38 Z" className="fill-butter stroke-ink" strokeWidth={2.6} strokeLinejoin="round" />
    </Doodle>
  );
}
