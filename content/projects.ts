import type { StaticImageData } from "next/image";

export type ProjectKind = "website" | "app" | "design-engineering";

export type Project = {
  id: string;
  /** Websites and apps get the wide card; design-engineering pieces the narrow one. */
  kind: ProjectKind;
  title: string;
  description: string;
  stack: string;
  /** Ground behind the still. */
  tint: "tint-pink" | "tint-sage" | "tint-butter";
  /** Until supplied, the card shows a "[still image]" block. */
  still?: { src: StaticImageData | string; alt: string };
  /** Muted screen recording. Without one the card stays a still. */
  video?: { src: string };
  /** Live site, or the GitHub repo for design-engineering pieces. */
  href?: string;
};

export const projects: Project[] = [
  {
    id: "p1",
    kind: "website",
    title: "[Project name]",
    description: "[One line: what it is and who it was for.]",
    stack: "[stack]",
    tint: "tint-pink",
  },
  {
    id: "p2",
    kind: "design-engineering",
    title: "[Experiment name]",
    description: "[One line: the idea it explores.]",
    stack: "[stack]",
    tint: "tint-sage",
  },
  {
    id: "p3",
    kind: "app",
    title: "[Project name]",
    description: "[One line: what it is and who it was for.]",
    stack: "[stack]",
    tint: "tint-butter",
  },
  {
    id: "p4",
    kind: "design-engineering",
    title: "[Experiment name]",
    description: "[One line: the idea it explores.]",
    stack: "[stack]",
    tint: "tint-pink",
  },
  {
    id: "p5",
    kind: "design-engineering",
    title: "[Experiment name]",
    description: "[One line: the idea it explores.]",
    stack: "[stack]",
    tint: "tint-butter",
  },
  {
    id: "p6",
    kind: "website",
    title: "[Project name]",
    description: "[One line: what it is and who it was for.]",
    stack: "[stack]",
    tint: "tint-sage",
  },
];
