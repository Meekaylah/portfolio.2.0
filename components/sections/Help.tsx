import { FloatIn } from "@/components/ui/FloatIn";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { site } from "@/content/site";
import { MessageButton } from "./MessageDialog";

function Tick() {
  return (
    <svg aria-hidden="true" focusable="false" width={18} height={18} viewBox="0 0 18 18" className="mt-0.75 flex-none">
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
          <div aria-hidden="true" className="inline-flex items-center gap-1.5 font-display text-small text-rose-deep">
            <span>{help.note}</span>
            <svg
              width={26}
              height={20}
              viewBox="0 0 64 50"
              focusable="false"
              className="flex-none overflow-visible stroke-pink"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path strokeWidth={1.9} d="M24.5 6 C 25.5 15, 28 19, 39 21.5 C 29.5 23.5, 26 27, 23.5 38.5 C 22 28.5, 18.5 24.5, 9 22.5 C 17.5 20.5, 22.5 16, 24.2 5.2" />
              <path strokeWidth={1.7} d="M8 33 C 8.6 37, 10 39, 14 40 C 10.2 41, 8.8 42.5, 7.6 47 C 7 43, 5.5 41.3, 2 40.3 C 5.5 39.2, 7.2 37.3, 8.3 32.6" />
              <path strokeWidth={1.6} d="M44 26 C 45 28, 46 29, 47.6 30 C 46 31, 45 32.4, 44.1 34 C 43.3 32.3, 42.3 31, 40.7 29.9 C 42.3 29, 43.3 27.8, 44.2 25.6" />
              <path strokeWidth={1.6} d="M52 4 L52.3 14 M47 9.2 L57 8.8" />
              <path strokeWidth={1.5} d="M34 38.5 L34.2 45.5 M30.6 42 L37.6 41.8" />
              <circle cx="12" cy="10" r="1.3" className="fill-pink" stroke="none" />
              <circle cx="59" cy="20" r="1.1" className="fill-pink" stroke="none" />
              <circle cx="3.5" cy="27" r="0.9" className="fill-pink" stroke="none" />
              <circle cx="50" cy="44" r="1" className="fill-pink" stroke="none" />
            </svg>
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
              <MaybeLink href={links.cv} target="_blank" rel="noopener noreferrer" className="btn">
                {help.teams.cta}
              </MaybeLink>
              {/* Kept together, so they wrap below the button as a pair */}
              <div className="flex gap-5">
                <MaybeLink href={links.github} target="_blank" rel="noopener noreferrer" className={textLink}>
                  GitHub
                </MaybeLink>
                <MaybeLink href={links.linkedin} target="_blank" rel="noopener noreferrer" className={textLink}>
                  LinkedIn
                </MaybeLink>
              </div>
            </div>
          </div>

          {/* Hand-drawn divider: upright between the halves, flat once they stack */}
          <div aria-hidden="true" className="flex justify-center max-stack:hidden">
            <svg width={20} height="100%" viewBox="0 0 20 400" preserveAspectRatio="none" focusable="false" className="min-h-95">
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
              <MessageButton className="btn">{help.clients.cta}</MessageButton>
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
