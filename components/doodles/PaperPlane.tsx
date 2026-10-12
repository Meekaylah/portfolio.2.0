import { Doodle, Stroke } from "./Doodle";

export function PaperPlane({ className, delay }: { className?: string; delay?: number }) {
  return (
    <Doodle className={className} delay={delay} width={100} height={70} viewBox="0 0 100 70">
      <Stroke d="M6 34 L94 6 L58 64 L44 42 Z" className="fill-paper-raised stroke-ink" strokeWidth={2.6} strokeLinejoin="round" />
      <Stroke d="M44 42 L94 6" className="fill-none stroke-ink" strokeWidth={2.6} strokeLinecap="round" />
    </Doodle>
  );
}
