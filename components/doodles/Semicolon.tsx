import { Doodle, Stroke } from "./Doodle";

export function Semicolon({ className, delay }: { className?: string; delay?: number }) {
  return (
    <Doodle className={className} delay={delay} width={40} height={80} viewBox="0 0 40 80">
      <Stroke d="M20 12 C24 12 26 16 26 18 C26 22 22 24 20 24 C16 24 14 22 14 18 C14 14 16 12 20 12" className="fill-ink stroke-ink" strokeWidth={2} />
      <Stroke d="M20 42 C24 42 26 46 26 48 C26 52 24 54 22 55 C24 60 20 66 12 70" className="fill-none stroke-ink" strokeWidth={3} strokeLinecap="round" />
    </Doodle>
  );
}
