import { ImageResponse } from "next/og";

// Link-preview image (WhatsApp, LinkedIn, X, iMessage, Slack…). Rendered once
// at build time to a static 1200×630 PNG. Also served as the Twitter image via
// twitter-image.tsx.

export const alt = "Zovak — Make your AI startup impossible to ignore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BEIGE = "#F1E7D2";
const BEIGE_SOFT = "#E9DCC2";
const FOREST = "#1F4E3A";
const ACCENT = "#2F6B4F";
const MINT = "#6DBF84";
const INK = "#1B2A21";

// Fraunces (the site's display face) from Google Fonts; satori needs TTF/OTF,
// which Google serves when no browser user-agent is sent. Falls back to the
// default font if the fetch fails so the build never breaks.
async function loadFont(weight: number, italic: boolean): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@${italic ? 1 : 0},${weight}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const [regular, italic] = await Promise.all([loadFont(400, false), loadFont(500, true)]);
  const fonts = [
    regular && { name: "Fraunces", data: regular, weight: 400 as const, style: "normal" as const },
    italic && { name: "Fraunces", data: italic, weight: 500 as const, style: "italic" as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: BEIGE,
          fontFamily: "Fraunces",
          overflow: "hidden",
        }}
      >
        {/* Soft green glows */}
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -200,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(109,191,132,0.55), rgba(109,191,132,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -220,
            bottom: -260,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(47,107,79,0.28), rgba(47,107,79,0) 70%)",
          }}
        />

        {/* Left: brand + headline */}
        <div style={{ display: "flex", flexDirection: "column", padding: "64px 0 60px 72px", width: 820 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: ACCENT,
                color: BEIGE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontFamily: "monospace",
              }}
            >
              Z
            </div>
            <div style={{ fontSize: 36, fontStyle: "italic", fontWeight: 500, color: FOREST }}>Zovak</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 64 }}>
            <div style={{ fontSize: 66, lineHeight: 1.05, color: INK, letterSpacing: -1.5 }}>Make your AI startup</div>
            <div
              style={{
                display: "flex",
                fontSize: 70,
                lineHeight: 1.12,
                fontStyle: "italic",
                fontWeight: 500,
                color: ACCENT,
                letterSpacing: -1.5,
                borderBottom: `6px solid ${MINT}`,
                paddingBottom: 6,
                alignSelf: "flex-start",
              }}
            >
              impossible to ignore.
            </div>
          </div>

          <div style={{ display: "flex", marginTop: "auto", gap: 12 }}>
            {["Brand", "Product", "Websites", "AI"].map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "10px 22px",
                  borderRadius: 9999,
                  border: `2px solid rgba(47,107,79,0.25)`,
                  background: "rgba(251,247,238,0.7)",
                  color: FOREST,
                  fontSize: 24,
                  fontFamily: "sans-serif",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Right: green terminal card */}
        <div
          style={{
            position: "absolute",
            right: 48,
            top: 120,
            width: 300,
            height: 300,
            display: "flex",
            flexDirection: "column",
            borderRadius: 24,
            background: `linear-gradient(135deg, ${FOREST}, #13291F)`,
            boxShadow: "0 40px 80px -30px rgba(31,78,58,0.6)",
            transform: "rotate(3deg)",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", gap: 8, padding: "18px 20px", borderBottom: "1px solid rgba(241,231,210,0.12)" }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: 9999, background: "rgba(241,231,210,0.25)" }} />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              padding: "24px 24px",
              fontFamily: "monospace",
              fontSize: 18,
              color: "rgba(241,231,210,0.55)",
            }}
          >
            <div style={{ display: "flex" }}>$ zovak build --brand</div>
            <div style={{ display: "flex" }}>$ zovak build --product</div>
            <div style={{ display: "flex" }}>$ zovak build --website</div>
            <div style={{ display: "flex", color: BEIGE }}>
              <span style={{ color: MINT, marginRight: 8 }}>$</span>zovak deploy
            </div>
            <div style={{ display: "flex", color: MINT }}>Shipped — live</div>
          </div>
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            right: 72,
            bottom: 56,
            display: "flex",
            fontSize: 26,
            color: FOREST,
            fontFamily: "sans-serif",
            background: BEIGE_SOFT,
            padding: "8px 20px",
            borderRadius: 9999,
          }}
        >
          zovak.tech
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
