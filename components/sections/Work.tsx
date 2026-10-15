import { FloatIn } from "@/components/ui/FloatIn";
import Image from "next/image";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { projects, type Project, type ProjectKind } from "@/content/projects";
import { PreviewCard } from "./PreviewCard";
import { ScrollButtons } from "./ScrollButtons";

const kindLabel: Record<ProjectKind, string> = {
  website: "Website",
  app: "App",
  webapp: "Web App",
  "design-engineering": "Design engineering",
};

const tint: Record<Project["tint"], string> = {
  "tint-pink": "bg-tint-pink",
  "tint-sage": "bg-tint-sage",
  "tint-butter": "bg-tint-butter",
};

function ProjectCard({ project }: { project: Project }) {
  const wide = project.kind !== "design-engineering";
  const card = `group flex flex-none snap-start flex-col gap-3.5 ${wide ? "w-[min(560px,76vw)]" : "w-[min(280px,62vw)]"}`;
  const media = `relative h-[380px] overflow-hidden rounded-media border border-line max-nav:h-[300px] ${tint[project.tint]}`;

  const still = project.still ? (
    <Image
      src={project.still.src}
      alt={project.still.alt}
      fill
      sizes={wide ? "(max-width: 720px) 76vw, 560px" : "(max-width: 720px) 62vw, 280px"}
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
      <div className="flex min-h-11 -translate-y-1 flex-wrap items-center gap-x-1 text-caption opacity-0 transition duration-200 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
        <span className="text-ink-muted">{project.stack}</span>
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Code for ${project.title} on GitHub`}
            className="inline-flex size-11 items-center justify-center transition-colors duration-150 ease-soft hover:text-rose"
          >
            <svg aria-hidden="true" focusable="false" width={20} height={20} viewBox="0 0 16 16" className="fill-current">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        )}
        <MaybeLink href={project.href ?? null} target="_blank" rel="noopener noreferrer" className="link-mark inline-flex min-h-11 items-center">
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

  return (
    <PreviewCard
      title={project.title}
      video={project.video}
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

        <div className="flex items-center gap-5 max-[55rem]:w-full max-[55rem]:justify-between">
          {/* The arrow hangs to the left of the words, so they keep room for it.
              Below 720px it flips over to their right, smaller, into the gap
              before the buttons; the narrowest phones have no gap to give. */}
          <div aria-hidden="true" className="relative ml-18 font-display text-small text-rose max-[55rem]:ml-0">
            <svg
              width={70}
              height={54}
              viewBox="0 0 70 54"
              focusable="false"
              className="absolute top-1 right-full mr-1 overflow-visible max-[55rem]:right-auto max-[55rem]:left-full max-[55rem]:mr-0 max-[55rem]:ml-1 max-[55rem]:h-auto max-[55rem]:w-12 max-[55rem]:-scale-x-100 max-[22rem]:hidden"
            >
              <path
                d="M66 4 C 58 6, 50 9, 47 15 C 44 21, 47 29, 54 29.5 C 60 30, 63 24, 61 19 C 59 14, 52 12, 46 13 C 32 15, 22 30, 18 49"
                className="fill-none stroke-pink"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
              <path
                d="M13 41 L18 50 L25 43.5"
                className="fill-none stroke-pink"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>hover to see it move</span>
          </div>
          <ScrollButtons targetId="work-track" />
        </div>
      </div>

      <FloatIn order={1} className="mx-auto mt-10 max-w-312">
        <ul
          id="work-track"
          aria-label="Projects"
          tabIndex={0}
          className="flex snap-x snap-mandatory scroll-pl-6 gap-7 overflow-x-auto px-6 pt-2 pb-6 scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
      </FloatIn>
    </section>
  );
}
