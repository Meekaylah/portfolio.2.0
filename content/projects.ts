import type { StaticImageData } from "next/image";

export type ProjectKind = "website" | "webapp";

export type Project = {
  id: string;
  /** The label above the title. */
  kind: ProjectKind;
  title: string;
  description: string;
  stack: string;
  /** Ground behind the still. */
  tint: "tint-pink" | "tint-sage" | "tint-butter";
  still: { src: StaticImageData | string; alt: string };
  /** Muted screen recording, and the first frame shown while it loads. Without one the card stays a still. */
  video?: { webm: string; mp4: string; poster: string };
  /** Live site. */
  href: string;
  /** Source code, shown as a GitHub icon beside the link. */
  repo: string;
};

export const projects: Project[] = [
  {
    id: "model-checker",
    kind: "webapp",
    title: "3D Model Load Checker",
    description: "Checks whether a 3D model will load on a phone, tablet or desktop, right in the browser.",
    stack: "C#, .NET, Blazor WebAssembly, xUnit, bUnit, GitHub Actions",
    tint: "tint-pink",
    still: {
      src: "/projects/model-checker/model-checker-still.webp",
      alt: "3D Model Load Checker showing a chair model rated Ready on phone, tablet and desktop",
    },
    video: {
      webm: "/projects/model-checker/model-checker-preview.webm",
      mp4: "/projects/model-checker/model-checker-preview.mp4",
      poster: "/projects/model-checker/model-checker-preview-poster.jpg",
    },
    href: "https://3d-model-checker.netlify.app/",
    repo: "https://github.com/Meekaylah/model-load-checker",
  },
  {
    id: "movie-app",
    kind: "website",
    title: "MovieBox",
    description: "A movie discovery site with a rotating featured banner and live film data from TMDB.",
    stack: "React, Vite, React Router, TMDB API",
    tint: "tint-butter",
    still: {
      src: "/projects/movie-app/movie-app-still.webp",
      alt: "MovieBox home page with a Spider-Man: Brand New Day banner and a search bar",
    },
    video: {
      webm: "/projects/movie-app/movie-app-preview.webm",
      mp4: "/projects/movie-app/movie-app-preview.mp4",
      poster: "/projects/movie-app/movie-app-preview-poster.jpg",
    },
    href: "https://movie-discovery-webapp-six.vercel.app/",
    repo: "https://github.com/Meekaylah/movie_discovery-webapp",
  },
];
