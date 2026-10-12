import { FloatIn } from "@/components/ui/FloatIn";
import Image from "next/image";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { projects, type Project, type ProjectKind } from "@/content/projects";
import { PreviewCard } from "./PreviewCard";
import { ScrollButtons } from "./ScrollButtons";

const kindLabel: Record<ProjectKind, string> = {
  website: "Website",
  app: "App",
  "design-engineering": "Design engineering",
};

const tint: Record<Project["tint"], string> = {
  "tint-pink": "bg-tint-pink",
  "tint-sage": "bg-tint-sage",
  "tint-butter": "bg-tint-butter",
};

function ProjectCard({ project }: { project: Project }) {
  const wide = project.kind !== "design-engineering";
  const card = `group flex flex-none snap-start flex-col gap-3.5 ${wide ? "w-[min(560px,82vw)]" : "w-[min(280px,62vw)]"}`;
  const media = `relative h-[380px] overflow-hidden rounded-media border border-line max-nav:h-[300px] ${tint[project.tint]}`;

  const still = project.still ? (
    <Image
      src={project.still.src}
      alt={project.still.alt}
      fill
      sizes={wide ? "(max-width: 720px) 82vw, 560px" : "(max-width: 720px) 62vw, 280px"}
      className="object-cover"
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center text-caption text-ink-muted">
      [still image]
    </div>
  );

  const details = (
    <div className="flex flex-col gap-1">
      <p className="text-label tracking-[0.04em] text-rose">{kindLabel[project.kind]}</p>
      <h3 className="text-title">{project.title}</h3>
      <p className="mt-0.5 text-small leading-[1.45] text-ink-soft">{project.description}</p>
      {/* Slides in on hover or keyboard focus; always there on touch screens */}
      <div className="flex min-h-11 -translate-y-1 flex-wrap items-center gap-x-3.5 text-caption opacity-0 transition duration-200 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
        <span className="text-ink-muted">{project.stack}</span>
        <MaybeLink href={project.href ?? null} className="link-mark inline-flex min-h-11 items-center">
          {project.kind === "design-engineering" ? "See it on GitHub →" : "View project →"}
        </MaybeLink>
      </div>
    </div>
  );

  if (!project.video) {
    return (
      <li className={card}>
        <div className={media}>{still}</div>
        {details}
      </li>
    );
  }

  const poster = typeof project.still?.src === "string" ? project.still.src : project.still?.src.src;
  return (
    <PreviewCard
      title={project.title}
      video={project.video.src}
      poster={poster}
      className={card}
      mediaClassName={media}
      still={still}
    >
      {details}
    </PreviewCard>
  );
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="pt-18 pb-16">
      <div className="mx-auto flex max-w-300 flex-wrap items-end justify-between gap-6 px-6">
        <FloatIn>
          <h2 id="work-title" className="text-h2">
            Selected{" "}
            <span className="relative inline-block">
              work
              <svg
                aria-hidden="true"
                focusable="false"
                width={110}
                height={14}
                viewBox="0 0 110 14"
                className="absolute -bottom-2.5 -left-1"
              >
                <path d="M3 8 C 26 3, 52 12, 76 6 S 100 5, 107 8" className="fill-none stroke-pink" strokeWidth={2.6} strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="mt-4.5 max-w-115 text-lead leading-normal text-ink-soft">
            Whole websites and apps, and the small interface experiments in between.
          </p>
        </FloatIn>

        <div className="flex items-center gap-5">
          <div aria-hidden="true" className="flex items-center gap-2 font-display text-small text-rose">
            <span>hover to see it move</span>
            <svg width={34} height={18} viewBox="0 0 34 18" focusable="false">
              <path d="M2 10 C 12 4, 22 14, 31 8 M25 3 L31 8 L25 14" className="fill-none stroke-pink" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <ScrollButtons targetId="work-track" />
        </div>
      </div>

      <FloatIn order={1} className="mx-auto mt-10 max-w-312">
        <ul
          id="work-track"
          aria-label="Projects"
          tabIndex={0}
          className="flex snap-x snap-mandatory scroll-pl-6 gap-7 overflow-x-auto px-6 pt-2 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
      </FloatIn>
    </section>
  );
}
