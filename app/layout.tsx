import type { Metadata, Viewport } from "next";
import { Young_Serif, Figtree } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-young-serif",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: site.metadata.title,
  description: site.metadata.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: site.legalName,
    title: site.metadata.title,
    description: site.metadata.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#FAF6EF" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${youngSerif.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Revealed text starts hidden; without JavaScript, just show it */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;filter:none!important;transform:none!important}"}</style>
        </noscript>
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
