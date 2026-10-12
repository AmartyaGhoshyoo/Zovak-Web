import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import AssistantWidget from "@/components/assistant/AssistantWidget";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://www.zovak.tech";
const TITLE = "Zovak — Make your AI startup impossible to ignore";
const DESCRIPTION =
  "Zovak helps early-stage AI startups build brands, products and websites that make investors and customers take them seriously. Book a call to start your project.";

// The share image itself comes from src/app/opengraph-image.tsx (Next adds the
// og:image / twitter:image tags automatically); metadataBase makes its URL absolute,
// which WhatsApp, LinkedIn and X require.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Zovak",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#F1E7D2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} font-body`}
      >
        <Providers>
          {children}
          <AssistantWidget />
        </Providers>
      </body>
    </html>
  );
}
