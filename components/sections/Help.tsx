import { FloatIn } from "@/components/ui/FloatIn";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { site } from "@/content/site";

function Tick() {
  return (
    <svg aria-hidden="true" focusable="false" width={18} height={18} viewBox="0 0 18 18" className="mt-[3px] flex-none">
      <path d="M2 9 L7 14 L16 3" className="fill-none stroke-pink" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const eyebrow = "text-label text-rose-deep uppercase";
const body = "max-w-115 text-lead text-ink-soft";
const textLink = "link-mark inline-flex min-h-11 items-center hover:text-rose-deep";

export function Help() {
  const { help, links } = site;

  return (
    <section id="help" aria-labelledby="help-title" className="bg-blush px-6 pt-20 pb-22">
      <div className="mx-auto max-w-page">
        <FloatIn className="flex flex-wrap items-baseline gap-x-7 gap-y-3">
          <h2 id="help-title" className="text-h2">
            {help.title}
          </h2>
          <div aria-hidden="true" className="flex items-center gap-2 font-display text-small text-rose-deep">
            <svg width={34} height={18} viewBox="0 0 34 18" focusable="false">
              <path d="M32 9 C 22 4, 12 14, 3 8 M9 3 L3 8 L9 14" className="fill-none stroke-pink" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{help.note}</span>
          </div>
        </FloatIn>

        <FloatIn order={1} className="mt-14 grid grid-cols-[1fr_64px_1fr] items-stretch max-stack:grid-cols-1">
          <div className="flex flex-col gap-4.5 pr-2 max-stack:pr-0">
            <p className={eyebrow}>{help.teams.eyebrow}</p>
            <h3 className="text-h3">{help.teams.title}</h3>
            <p className={body}>{help.teams.body}</p>
            <ul className="mt-1.5 flex flex-col gap-3 text-body leading-[1.45]">
              {help.teams.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Tick />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3.5 flex flex-wrap items-center gap-5">
              <MaybeLink href={links.cv} className="btn">
                {help.teams.cta}
              </MaybeLink>
              <MaybeLink href={links.github} className={textLink}>
                GitHub
              </MaybeLink>
              <MaybeLink href={links.linkedin} className={textLink}>
                LinkedIn
              </MaybeLink>
            </div>
          </div>

          {/* Hand-drawn divider: upright between the halves, flat once they stack */}
          <div aria-hidden="true" className="flex justify-center max-stack:hidden">
            <svg width={20} height="100%" viewBox="0 0 20 400" preserveAspectRatio="none" focusable="false" className="min-h-[380px]">
              <path d="M10 4 C 4 60, 16 120, 10 180 C 4 240, 16 300, 10 396" className="fill-none stroke-ink" strokeWidth={2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div aria-hidden="true" className="my-10 hidden max-stack:block">
            <svg width="100%" height={12} viewBox="0 0 400 12" preserveAspectRatio="none" focusable="false" className="block">
              <path d="M4 6 C 80 2, 160 10, 240 6 S 360 3, 396 6" className="fill-none stroke-ink" strokeWidth={2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          <div className="flex flex-col gap-4.5 pl-2 max-stack:pl-0">
            <p className={eyebrow}>{help.clients.eyebrow}</p>
            <h3 className="text-h3">{help.clients.title}</h3>
            {help.clients.body.map((paragraph) => (
              <p key={paragraph} className={body}>
                {paragraph}
              </p>
            ))}
            <div className="mt-3.5 flex flex-wrap items-center gap-5">
              <a href="#contact" className="btn">
                {help.clients.cta}
              </a>
              <svg aria-hidden="true" focusable="false" width={72} height={50} viewBox="0 0 100 70">
                <path d="M6 34 L94 6 L58 64 L44 42 Z" className="fill-paper-raised stroke-ink" strokeWidth={2.8} strokeLinejoin="round" />
                <path d="M44 42 L94 6" className="fill-none stroke-ink" strokeWidth={2.8} strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </FloatIn>
      </div>
    </section>
  );
}
