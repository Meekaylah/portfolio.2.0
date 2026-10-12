import { Doodle, Stroke } from "./Doodle";

export function SpeechBubble({ className, delay }: { className?: string; delay?: number }) {
  return (
    <Doodle className={className} delay={delay} width={100} height={80} viewBox="0 0 100 80">
      <Stroke d="M14 12 C40 6 70 6 88 14 C94 28 94 44 86 54 C70 60 52 60 40 58 L22 72 L26 56 C14 52 8 40 10 26 Z" className="fill-petal stroke-ink" strokeWidth={2.6} strokeLinejoin="round" />
      <Stroke d="M34 33 L35 34 M50 33 L51 34 M66 33 L67 34" className="stroke-ink" strokeWidth={6} strokeLinecap="round" />
    </Doodle>
  );
}
