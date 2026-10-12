import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.hero.lead} ${site.hero.rest}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Colours mirror the tokens in app/globals.css (CSS variables aren't available here) */
const paper = "#FAF6EF";
const ink = "#2A1D21";
const inkQuiet = "#8A747A";
const pink = "#E0577F";

export default async function Image() {
  const [serif, sans] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/YoungSerif-Regular.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Figtree-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: paper,
          color: ink,
          fontFamily: "Young Serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ fontSize: 44 }}>{site.wordmark}</div>
          <svg width="150" height="18" viewBox="0 0 84 10">
            <path d="M2 6 C 18 2, 36 9, 52 4 S 74 3, 82 6" fill="none" stroke={pink} strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", fontSize: 72, lineHeight: 1.12, letterSpacing: "-0.012em", maxWidth: 1000 }}>
          <span>{site.hero.lead}&nbsp;</span>
          <span style={{ color: inkQuiet }}>{site.hero.rest}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Figtree", fontSize: 28 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: pink }} />
          {site.hero.availability[0]?.text}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Young Serif", data: serif, style: "normal", weight: 400 },
        { name: "Figtree", data: sans, style: "normal", weight: 500 },
      ],
    },
  );
}
