import { Braces } from "@/components/doodles/Braces";
import { Checkbox } from "@/components/doodles/Checkbox";
import { Circle } from "@/components/doodles/Circle";
import { CodeTag } from "@/components/doodles/CodeTag";
import { Cursor } from "@/components/doodles/Cursor";
import { Flower } from "@/components/doodles/Flower";
import { GroundLine, MugAndBooks, Plant } from "@/components/doodles/Ground";
import { PaperPlane } from "@/components/doodles/PaperPlane";
import { Semicolon } from "@/components/doodles/Semicolon";
import { SpeechBubble } from "@/components/doodles/SpeechBubble";
import { Squiggle } from "@/components/doodles/Squiggle";
import { TextReveal } from "@/components/ui/TextReveal";
import { site } from "@/content/site";
import { headline, revealDuration } from "@/lib/motion";
import { PulseDot } from "./PulseDot";

const dot = {
  pink: "bg-pink",
  sage: "border-[1.5px] border-ink bg-sage",
};

export function Hero() {
  const { hero } = site;
  /* The rest follows on from the lead's last word, after a short pause */
  const leadWords = hero.lead.trim().split(/\s+/).length;
  const restDelay = headline.delay + leadWords * headline.stagger + headline.pause;
  const headlineEnd = restDelay + revealDuration(hero.rest);

  return (
    <div className="px-6">
      {/* Header (85px) + gap (24px) + hero fill exactly one screen, so the whole
          scene is visible without scrolling. The floors are the least room the
          scene needs before doodles start touching the text. */}
      <section
        aria-labelledby="hero-title"
        className="relative mx-auto mt-6 flex min-h-[max(36.25rem,calc(100svh-109px))] max-nav:min-h-[max(40rem,calc(100svh-109px))] max-w-300 flex-col items-center justify-center text-center"
      >
        <Braces className="top-[12%] left-[9%] max-nav:hidden" delay={0.1} />
        <Flower className="top-[4%] left-[25%]" delay={0.25} />
        <SpeechBubble className="top-[42%] left-[3%] max-nav:hidden" delay={0.4} />
        <Squiggle className="top-[62%] left-[15%] max-nav:hidden" delay={1.80} />
        <Circle className="top-[1%] left-[46%] max-nav:hidden" delay={0.7} />
        <CodeTag className="top-[5%] right-[24%]" delay={0.3} />
        <Checkbox className="top-[14%] right-[7%] max-nav:hidden" delay={0.45} />
        <PaperPlane className="top-[44%] right-[4%] max-nav:hidden" delay={0.6} />
        <Cursor className="top-[62%] right-[19%] max-nav:hidden" delay={0.75} />
        <Semicolon className="top-[70%] right-[33%] max-nav:hidden" delay={0.85} />

        {/* On short windows the headline eases down with the height so it still fits */}
        <h1
          id="hero-title"
          className="relative max-w-[15em] text-display"
          style={{ fontSize: "min(var(--text-display), 7.8svh)" }}
        >
          <TextReveal text={hero.lead} delay={headline.delay} stagger={headline.stagger} />{" "}
          <TextReveal text={hero.rest} delay={restDelay} stagger={headline.stagger} className="text-ink-quiet" />
        </h1>

        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-5">
          <a href="#contact" className="btn">
            {hero.cta}
          </a>
          <div className="text-left text-small leading-[1.35]">
            <ul>
              {hero.availability.map((line) => (
                <li key={line.text} className="flex items-center gap-2">
                  {line.tone === "pink" ? (
                    <PulseDot delay={headlineEnd} />
                  ) : (
                    <span aria-hidden="true" className={`size-2 rounded-full ${dot[line.tone]}`} />
                  )}
                  {line.text}
                </li>
              ))}
            </ul>
            <p className="pl-4 text-ink-muted">{hero.location}</p>
          </div>
        </div>

        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[130px]">
          <Plant className="absolute bottom-1.5 left-[12%] max-nav:hidden" />
          <MugAndBooks className="absolute right-[13%] bottom-1.5" />
          <GroundLine className="absolute bottom-0 left-0 block" />
        </div>
      </section>
    </div>
  );
}
