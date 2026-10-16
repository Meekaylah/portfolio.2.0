import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileMenu, type MenuLink } from "./MobileMenu";

const left: MenuLink[] = [
  { label: "Work", href: "#work" },
  { label: "How I can help", href: "#help" },
];
const right: MenuLink[] = [
  { label: "Kind words", href: "#words" },
  { label: "Contact me", href: "#contact" },
];

function SideNav({ label, links, className }: { label: string; links: MenuLink[]; className?: string }) {
  return (
    <nav aria-label={label} className={`flex gap-[clamp(1.5rem,3vw,2.5rem)] max-nav:hidden ${className ?? ""}`}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
          className="group inline-flex min-h-11 items-center whitespace-nowrap"
        >
          {/* A crooked petal highlight sweeps in from the left on hover or keyboard focus */}
          <span className="relative">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 -left-1.5 w-0 scale-y-90 -skew-y-1 bg-petal transition-[width] duration-300 ease-soft group-focus-visible:w-[calc(100%+0.75rem)] group-hover:w-[calc(100%+0.75rem)]"
            />
            <span className="relative">{link.label}</span>
          </span>
        </a>
      ))}
    </nav>
  );
}

export function Header() {
  return (
    <header className="px-6 pt-7">
      <div className="mx-auto grid max-w-300 grid-cols-[1fr_auto_1fr] items-center gap-6 text-body">
        <SideNav label="Primary, left" links={left} className="justify-end" />
        <Link
          href="/"
          aria-label="michaela.dev, home"
          className="col-start-2 px-[clamp(0.5rem,2vw,1.75rem)] transition-colors duration-150 hover:text-rose"
        >
          <Wordmark className="items-center text-[clamp(1.5rem,2.6vw,2rem)]" underlineClassName="-mt-[8px] text-pink" />
        </Link>
        <SideNav label="Primary, right" links={right} />
        <div className="col-start-3 hidden justify-end max-nav:flex">
          <MobileMenu links={[...left, ...right]} />
        </div>
      </div>
    </header>
  );
}
