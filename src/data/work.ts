import { WorkItem } from "@/types";

// Each project can hold a full gallery via `images` (aim for 4-5: a hero
// shot, a couple of detail/section views, and a mobile view if you have
// one). Until you add more, we just fall back to the single cover image —
// the gallery UI adapts automatically (no arrows/thumbnails show up for a
// single-image project).
//
// Set `liveUrl` to the deployed site once a project is live and the
// gallery's CTA switches from "Book a demo call" to "View live site".

export const work: WorkItem[] = [
  {
    name: "",
    type: "Website",
    description: "",
    gradient: "from-accent to-[#8B5E34]",
    image: "/work/Concept_2.png",
    images: ["/work/Concept_2.png"],
    href: "#contact",
    // liveUrl: "https://example.com",
  },
  {
    name: "",
    type: "Website",
    description: "",
    gradient: "from-[#1F3B36] to-accent2",
    image: "/work/Farcast_2.png",
    images: ["/work/Farcast_2.png"],
    href: "#contact",
  },
  {
    name: "",
    type: "Website",
    description: "",
    gradient: "from-[#1B2A4A] to-[#3E5C86]",
    image: "/work/Hero_1.png",
    images: ["/work/Hero_1.png"],
    href: "#contact",
  },
  {
    name: "",
    type: "AI Solution",
    description:
      "Support agent trained on a startup's own docs — deflects 60% of tier-1 tickets today.",
    gradient: "from-[#4B2E5B] to-accent",
    image: "/work/Oak_Hero_3.png",
    images: ["/work/Oak_Hero_3.png"],
    href: "#contact",
  },
  {
    name: "",
    type: "Website",
    description: "",
    gradient: "from-[#7A3B3B] to-[#B5793D]",
    image: "/work/Ignyte_Hero_2.png",
    images: ["/work/Ignyte_Hero_2.png"],
    href: "#contact",
  },
  {
    name: "",
    type: "Website",
    description: "",
    gradient: "from-[#2B4A4F] to-accent2",
    image: "/work/Oak_Hero_2.png",
    images: ["/work/Oak_Hero_2.png"],
    href: "#contact",
  },
];
