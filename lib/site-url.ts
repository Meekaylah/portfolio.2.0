import { site } from "@/content/site";

/**
 * The site's public address, for metadata, sitemap and Open Graph.
 * Set `url` in content/site.ts once the domain is decided; until then it
 * falls back to the deployment's own address, or localhost in development.
 */
export function siteUrl() {
  const fromHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return site.url ?? process.env.NEXT_PUBLIC_SITE_URL ?? (fromHost ? `https://${fromHost}` : "http://localhost:3000");
}
