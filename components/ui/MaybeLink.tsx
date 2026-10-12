import type { ComponentProps } from "react";

/* A link whose destination may not have been supplied yet (see content/site.ts).
   Without one it keeps its label and look but is not a link. */
export function MaybeLink({ href, ...props }: Omit<ComponentProps<"a">, "href"> & { href: string | null }) {
  if (!href) return <span className={props.className}>{props.children}</span>;
  return <a href={href} {...props} />;
}

