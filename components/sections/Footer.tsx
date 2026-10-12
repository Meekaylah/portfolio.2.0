import { MaybeLink } from "@/components/ui/MaybeLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { site } from "@/content/site";

type FooterLink = { label: string; href: string | null };

function Column({ title, links }: { title: string; links: FooterLink[] }) {
  const id = `footer-${title.toLowerCase()}`;
  return (
    <nav aria-labelledby={id} className="text-body">
      <p id={id} className="mb-1 text-on-ink">
        {title}
      </p>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <MaybeLink
              href={link.href}
              className="flex min-h-11 items-center text-on-ink-muted transition-colors duration-150 hover:text-on-ink"
            >
              {link.label}
            </MaybeLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const { email, links } = site;

  return (
    <footer className="bg-ink px-6 pt-40 pb-12 text-on-ink">
      <div className="mx-auto grid max-w-page grid-cols-[minmax(0,1fr)_auto] items-end gap-10 max-stack:grid-cols-1">
        <div className="flex flex-col gap-3.5">
          <a
            href="#"
            aria-label="michaela.dev, back to top"
            className="self-start text-on-ink-display transition-colors duration-150 hover:text-on-ink"
          >
            <Wordmark
              className="text-[clamp(3rem,6vw,4.5rem)] leading-none"
              underlineClassName="mt-0.5 text-on-ink-accent"
              underlineWidth={150}
              underlineHeight={16}
            />
          </a>
          <p className="text-caption text-on-ink-muted">
            © {new Date().getFullYear()} {site.legalName} · {site.footer.location}
          </p>
        </div>

        <div className="flex gap-18 max-stack:gap-12">
          <Column
            title="Connect"
            links={[
              { label: "Send an email", href: email ? `mailto:${email}` : null },
              { label: "Book a call", href: links.bookCall },
              { label: "LinkedIn", href: links.linkedin },
              { label: "GitHub", href: links.github },
            ]}
          />
          <Column
            title="Explore"
            links={[
              { label: "Work", href: "#work" },
              { label: "How I can help", href: "#help" },
              { label: "Kind words", href: "#words" },
              { label: "CV", href: links.cv },
            ]}
          />
        </div>
      </div>
    </footer>
  );
}
