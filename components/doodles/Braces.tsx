import { Doodle, Stroke } from "./Doodle";

export function Braces({ className, delay }: { className?: string; delay?: number }) {
  return (
    <Doodle className={className} delay={delay} width={110} height={80} viewBox="0 0 110 80">
      <Stroke d="M30 8 C18 8 20 22 20 32 C20 38 14 40 8 40 C14 40 20 42 20 48 C20 58 18 72 30 72" className="fill-none stroke-ink" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <Stroke d="M80 8 C92 8 90 22 90 32 C90 38 96 40 102 40 C96 40 90 42 90 48 C90 58 92 72 80 72" className="fill-none stroke-ink" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </Doodle>
  );
}
