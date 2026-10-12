import { Doodle, Oval } from "./Doodle";

export function Flower({ className, delay }: { className?: string; delay?: number }) {
  return (
    <Doodle className={className} delay={delay} width={80} height={80} viewBox="0 0 80 80">
      <Oval cx={40} cy={20} rx={9} ry={15} className="fill-petal stroke-ink" strokeWidth={2.4} />
      <g transform="rotate(60 40 40)">
        <Oval cx={40} cy={20} rx={9} ry={15} className="fill-petal stroke-ink" strokeWidth={2.4} />
      </g>
      <g transform="rotate(120 40 40)">
        <Oval cx={40} cy={20} rx={9} ry={15} className="fill-petal stroke-ink" strokeWidth={2.4} />
      </g>
      <g transform="rotate(180 40 40)">
        <Oval cx={40} cy={20} rx={9} ry={15} className="fill-petal stroke-ink" strokeWidth={2.4} />
      </g>
      <g transform="rotate(240 40 40)">
        <Oval cx={40} cy={20} rx={9} ry={15} className="fill-petal stroke-ink" strokeWidth={2.4} />
      </g>
      <g transform="rotate(300 40 40)">
        <Oval cx={40} cy={20} rx={9} ry={15} className="fill-petal stroke-ink" strokeWidth={2.4} />
      </g>
      <Oval cx={40} cy={40} rx={9} ry={9} className="fill-butter stroke-ink" strokeWidth={2.4} />
    </Doodle>
  );
}
