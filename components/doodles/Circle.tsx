import { Doodle, Stroke } from "./Doodle";

export function Circle({ className, delay }: { className?: string; delay?: number }) {
  return (
    <Doodle className={className} delay={delay} width={40} height={40} viewBox="0 0 40 40">
      <Stroke d="M20 6 C28 6 34 12 34 20 C34 28 28 34 20 34 C12 34 6 28 6 20 C6 12 12 6 20 6" className="fill-none stroke-ink" strokeWidth={2.6} />
    </Doodle>
  );
}
