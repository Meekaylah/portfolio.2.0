import Link from "next/link";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { site } from "@/content/site";
import { MobileMenu, type MenuLink } from "./MobileMenu";

const left: MenuLink[] = [
  { label: "Work", href: "#work" },
  { label: "How I can help", href: "#help" },
];
const right: MenuLink[] = [
  { label: "Kind words", href: "#words" },
  { label: "CV", href: site.links.cv },
];

function SideNav({ label, links, className }: { label: string; links: MenuLink[]; className?: string }) {
  return (
    <nav aria-label={label} className={`flex gap-10 max-nav:hidden ${className ?? ""}`}>
      {links.map((link) => (
        <MaybeLink
          key={link.label}
          href={link.href}
          className="inline-flex min-h-11 items-center transition-colors duration-150 hover:text-rose"
        >
          {link.label}
        </MaybeLink>
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
          className="col-start-2 px-7 transition-colors duration-150 hover:text-rose"
        >
          <Wordmark className="items-center text-[2rem]" underlineClassName="-mt-[8px] text-pink" />
        </Link>
        <SideNav label="Primary, right" links={right} />
        <div className="col-start-3 hidden justify-end max-nav:flex">
          <MobileMenu links={[...left, ...right]} />
        </div>
      </div>
    </header>
  );
}
