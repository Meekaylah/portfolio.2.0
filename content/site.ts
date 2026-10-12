export type Availability = { text: string; tone: "pink" | "sage" };

export type SiteContent = {
  wordmark: string;
  legalName: string;
  /** Production URL, used for metadata, sitemap and Open Graph. */
  url: string | null;
  metadata: { title: string; description: string };
  hero: {
    lead: string;
    rest: string;
    cta: string;
    availability: Availability[];
    location: string;
  };
  /** null until supplied: the link keeps its label but goes nowhere. */
  email: string | null;
  links: {
    cv: string | null;
    github: string | null;
    linkedin: string | null;
    bookCall: string | null;
  };
  help: {
    title: string;
    note: string;
    teams: { eyebrow: string; title: string; body: string; points: string[]; cta: string };
    clients: { eyebrow: string; title: string; body: string[]; cta: string };
  };
  contact: {
    headline: string;
    labels: string[];
    body: string;
    form: {
      title: string;
      intro: string;
      /** The "I'm…" choice; each one changes what the message box asks for. */
      reasons: { value: "hiring" | "website" | "hi"; label: string; messageLabel: string }[];
      defaultMessageLabel: string;
      sent: string;
    };
  };
  footer: { location: string };
};

export const site: SiteContent = {
  wordmark: "michaela.dev",
  legalName: "Michaela Usanga",
  url: null,
  metadata: {
    title: "Michaela Usanga's Portfolio",
    description:
      "Michaela Usanga is a software engineer and web developer specializing in building modern, responsive web applications. Explore her portfolio to see her projects and skills.",
  },
  hero: {
    lead: "Hi, I'm Michaela,",
    rest: "a software engineer who builds user friendly interfaces.",
    cta: "Say hello",
    availability: [
      { text: "Open to software engineering roles", tone: "pink" },
    ],
    location: "Cambridge, United Kingdom",
  },
  email: "michaelausangaa@gmail.com",
  links: { cv: null, github: "https://github.com/Meekaylah", linkedin: null, bookCall: null },
  help: {
    title: "How I can help",
    note: "pick whichever sounds like you",
    teams: {
      eyebrow: "For teams",
      title: "Hiring a frontend engineer?",
      body: "[A sentence or two, in your words, on the kind of team and work you're looking for.]",
      points: [
        "Interfaces in React, Next.js and TypeScript, styled with Tailwind",
        "Shared components and colour tokens that keep a product consistent",
        "Reworking confusing screens so people actually use them",
      ],
      cta: "Read my CV",
    },
    clients: {
      eyebrow: "For clients",
      title: "Need a website?",
      body: [
        "[Who you build for and what kind of sites, e.g. a first site for a small business, or a refresh of one that's stopped working for you.]",
        "Tell me a little about it and I'll reply with whether I'm the right fit and what I'd suggest.",
      ],
      cta: "Tell me about your project",
    },
  },
  contact: {
    headline: "The kettle's on. Come and say hello.",
    labels: ["Interfaces", "Websites", "Design systems", "React & Next.js", "Design engineering"],
    body: "Hiring, planning a website, or just curious about something you saw here? I'd love to hear from you.",
    form: {
      title: "Leave a message",
      intro: "A few lines is plenty. I'll reply by email.",
      reasons: [
        { value: "hiring", label: "Hiring", messageLabel: "Tell me about the role" },
        { value: "website", label: "After a website", messageLabel: "Tell me about the website you have in mind" },
        { value: "hi", label: "Just saying hi", messageLabel: "Your message" },
      ],
      defaultMessageLabel: "Your message",
      sent: "Thank you, your message is on its way. I'll reply as soon as I can.",
    },
  },
  footer: { location: "London" },
};
