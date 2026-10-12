import { MaybeLink } from "@/components/ui/MaybeLink";
import { FloatIn } from "@/components/ui/FloatIn";
import { site } from "@/content/site";
import { MessageDialog } from "./MessageDialog";

/* Two hand-drawn outlines, alternated, and where each label sits around the headline. */
const outlines = [
  "M24 4 C 70 1, 140 2, 178 5 C 198 8, 198 42, 176 46 C 130 50, 64 49, 22 46 C 2 42, 3 8, 24 4 Z",
  "M22 5 C 70 2, 140 3, 180 4 C 199 9, 197 41, 178 46 C 130 49, 62 50, 24 45 C 3 41, 2 9, 22 5 Z",
];
const places = [
  "top-[6px] left-[9%] -rotate-[8deg]",
  "top-0 right-[8%] rotate-[7deg]",
  "top-[132px] left-[6%] rotate-[4deg]",
  "top-[140px] right-[5%] -rotate-[5deg]",
  "top-[236px] left-[40%] -rotate-[2deg]",
];

const inkLink =
  "underline decoration-on-ink-accent decoration-[1.5px] underline-offset-[5px] transition-colors duration-150 hover:text-on-ink-accent";
const body = "max-w-140 text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-[1.6] text-on-ink-body";

export function Contact() {
  const { contact, email, links } = site;

  return (
    <>
      <svg aria-hidden="true" focusable="false" width="100%" height={64} viewBox="0 0 1440 64" preserveAspectRatio="none" className="block">
        <path d="M0 40 C 240 26, 480 52, 720 34 S 1200 20, 1440 38 L1440 64 L0 64 Z" className="fill-ink" />
      </svg>

      <section id="contact" aria-labelledby="contact-title" className="on-ink bg-ink px-6 pt-24 text-on-ink">
        <div className="relative mx-auto flex max-w-page flex-col items-center pt-10 text-center">
          {contact.labels.map((label, index) => (
            <div
              key={label}
              aria-hidden="true"
              className={`absolute inline-flex items-center justify-center px-[22px] py-2.5 text-[clamp(0.9375rem,1.4vw,1.1875rem)] whitespace-nowrap max-stack:hidden ${places[index % places.length]}`}
            >
              <svg viewBox="0 0 200 50" preserveAspectRatio="none" focusable="false" className="absolute inset-0 size-full overflow-visible">
                <path d={outlines[index % outlines.length]} className="fill-none stroke-on-ink" strokeWidth={1.6} vectorEffect="non-scaling-stroke" />
              </svg>
              <span className="relative">{label}</span>
            </div>
          ))}

          <FloatIn className="relative">
            <h2 id="contact-title" className="max-w-[11em] text-closing text-on-ink-display">
              {contact.headline}
            </h2>
          </FloatIn>

          <FloatIn order={1} className="relative flex flex-col items-center">
            <svg aria-hidden="true" focusable="false" width={72} height={68} viewBox="40 0 60 60" className="mt-4.5">
              <path d="M60 18 C56 12 64 8 60 0" className="fill-none stroke-on-ink-muted" strokeWidth={2} strokeLinecap="round" />
              <path d="M74 18 C70 12 78 8 74 0" className="fill-none stroke-on-ink-muted" strokeWidth={2} strokeLinecap="round" />
              <path d="M50 24 L86 24 L83 54 L53 54 Z" className="fill-petal stroke-on-ink" strokeWidth={2.6} strokeLinejoin="round" />
              <path d="M85 30 C98 30 97 46 84 46" className="fill-none stroke-on-ink" strokeWidth={2.6} strokeLinecap="round" />
            </svg>

            <p className={`mt-7 ${body}`}>{contact.body}</p>
            <p className={`mt-4.5 ${body}`}>
              <MaybeLink href={email ? `mailto:${email}` : null} className={`text-on-ink ${inkLink}`}>
                Send me an email
              </MaybeLink>
              ,{" "}
              <MaybeLink href={links.bookCall} className={`text-on-ink ${inkLink}`}>
                book a quick call
              </MaybeLink>
              , or{" "}
              <MessageDialog copy={contact.form} email={email} className={`cursor-pointer text-on-ink ${inkLink}`} />
              .
            </p>
          </FloatIn>
        </div>
      </section>
    </>
  );
}
