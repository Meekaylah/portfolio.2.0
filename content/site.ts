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
    clients: { eyebrow: string; title: string; body: string[]; points: string[]; cta: string };
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
  links: { cv: "https://docs.google.com/document/d/10k_5fUc7ayi0R4zU3oCyTIUMA9uQ9t_kFpjbTtsm-JE/edit?usp=sharing", github: "https://github.com/Meekaylah", linkedin: "https://www.linkedin.com/in/michaela-usanga/", bookCall: "https://calendar.app.google/dHSEcLa4oybsQrjUA" },
  help: {
    title: "How I can help",
    note: "pick whichever sounds like you",
    teams: {
      eyebrow: "For teams",
      title: "Hiring a software engineer?",
      body: "I’m an engineer who looks at the whole picture: what the user sees, what the code does, and why it matters. Here’s what you’d get:",
      points: [
        "Features built end to end, with consistency all the way through",
        "Screens and features reworked until people actually want to use them",
        "New languages and tools, picked up fast when needed",
        "Building AI features, and building faster with AI tools"
      ],
      cta: "Read my CV",
    },
    clients: {
      eyebrow: "For projects",
      title: "Building a product?",
      body: [
        "Whether it’s a brand-new idea, a product that needs its next feature, a landing page that turns visitors into users, or an internal tool that takes the busywork off your team, I’ll help you get it built and in front of real people, fast.",
        "Whatever you have in mind, I’d love to hear about it",
      ],
      points: [
        "MVPs built quickly, so you can test the idea with real people",
        "AI features that actually help your users, not just look clever",
        "Landing pages and copy that turn visitors into users",
        "Internal tools that take the busywork off your team"
      ],
      cta: "Tell me about your project",
    },
  },
  contact: {
    headline: "Let's start with hello, world.",
    labels: ["Interfaces", "Accessibility", "Design systems", "Fullstack Development", "Software engineering"],
    body: "This is the part where you say hello 👋. Tell me about the role, the idea, or that bug that’s been bugging you 👾.",
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
  footer: { location: "United Kingdom" },
};
