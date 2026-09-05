import { ServiceIcon } from "@/types";

// Each illustration is deliberately a different silhouette — a wide browser
// window, a tall phone, and a circular orbit — so the three service panels
// read as distinct at a glance, not just re-tinted copies of each other.

function WebArt() {
  return (
    <svg viewBox="0 0 280 140" className="h-full w-full" aria-hidden="true">
      {/* Browser window chrome */}
      <rect x="18" y="14" width="244" height="112" rx="12" fill="#14231C" stroke="rgba(241,231,210,0.18)" />
      <rect x="18" y="14" width="244" height="26" rx="12" fill="#1D2E24" />
      <rect x="18" y="28" width="244" height="12" fill="#1D2E24" />
      <circle cx="36" cy="27" r="4" fill="#FF5F57" />
      <circle cx="50" cy="27" r="4" fill="#FEBC2E" />
      <circle cx="64" cy="27" r="4" fill="#28C840" />

      {/* Headline + body lines */}
      <rect x="36" y="60" width="104" height="10" rx="3" fill="#F1E7D2" />
      <rect x="36" y="80" width="140" height="6" rx="3" fill="rgba(241,231,210,0.5)" />
      <rect x="36" y="94" width="112" height="6" rx="3" fill="rgba(241,231,210,0.32)" />

      {/* Accent card / chart block */}
      <rect x="196" y="56" width="50" height="52" rx="8" fill="rgba(224,149,77,0.16)" stroke="rgba(224,149,77,0.4)" />
      <rect
        x="204"
        y="86"
        width="10"
        height="16"
        rx="2"
        fill="#E0954D"
        className="animate-bar-rise motion-reduce:animate-none"
        style={{ transformOrigin: "209px 102px", animationDelay: "0ms" }}
      />
      <rect
        x="219"
        y="76"
        width="10"
        height="26"
        rx="2"
        fill="#F1E7D2"
        className="animate-bar-rise motion-reduce:animate-none"
        style={{ transformOrigin: "224px 102px", animationDelay: "200ms" }}
      />
      <rect
        x="234"
        y="68"
        width="10"
        height="34"
        rx="2"
        fill="#E0954D"
        className="animate-bar-rise motion-reduce:animate-none"
        style={{ transformOrigin: "239px 102px", animationDelay: "400ms" }}
      />

      <g className="animate-scan-y motion-reduce:animate-none">
        <rect x="22" y="44" width="236" height="2" rx="1" fill="#E0954D" opacity="0.6" />
      </g>
    </svg>
  );
}

function AppArt() {
  return (
    <svg viewBox="0 0 280 140" className="h-full w-full" aria-hidden="true">
      {/* Phone body — tall, narrow, centered: unmistakably mobile */}
      <rect x="112" y="8" width="56" height="124" rx="14" fill="#14231C" stroke="rgba(241,231,210,0.2)" strokeWidth="1.5" />
      <rect x="128" y="16" width="24" height="4" rx="2" fill="rgba(241,231,210,0.35)" />

      {/* App tiles */}
      <rect x="122" y="30" width="36" height="24" rx="6" fill="rgba(224,149,77,0.28)" />
      <rect x="122" y="60" width="16" height="16" rx="4" fill="rgba(241,231,210,0.22)" />
      <rect x="144" y="60" width="16" height="16" rx="4" fill="rgba(241,231,210,0.22)" />
      <rect x="122" y="82" width="38" height="6" rx="3" fill="rgba(241,231,210,0.16)" />
      <rect x="132" y="118" width="16" height="4" rx="2" fill="rgba(241,231,210,0.3)" />

      {/* Notification ping traveling out from the phone */}
      <circle cx="168" cy="34" r="4" fill="#E0954D" className="animate-node-pulse motion-reduce:animate-none" />
      <path
        d="M172 34 C205 26, 226 44, 236 66"
        fill="none"
        stroke="#E0954D"
        strokeWidth="1.5"
        strokeDasharray="5 6"
        className="animate-dash-flow motion-reduce:animate-none"
      />
      <circle cx="236" cy="66" r="7" fill="none" stroke="#E0954D" strokeWidth="1.5" opacity="0.6" />
      <circle cx="236" cy="66" r="3.5" fill="#F1E7D2" className="animate-node-pulse motion-reduce:animate-none" />

      <circle cx="60" cy="46" r="3" fill="rgba(241,231,210,0.4)" className="animate-node-pulse motion-reduce:animate-none" />
      <circle cx="48" cy="96" r="3" fill="rgba(224,149,77,0.5)" className="animate-node-pulse motion-reduce:animate-none" />
    </svg>
  );
}

function AiArt() {
  return (
    <svg viewBox="0 0 280 140" className="h-full w-full" aria-hidden="true">
      {/* Concentric orbit rings around a pulsing core — circular motif,
          distinct from the rectangular browser/phone silhouettes */}
      <circle cx="140" cy="70" r="20" fill="rgba(241,231,210,0.08)" stroke="#E0954D" strokeWidth="1.5" />
      <circle cx="140" cy="70" r="7" fill="#E0954D" className="animate-node-pulse motion-reduce:animate-none" />

      <g className="origin-center animate-orbit-spin motion-reduce:animate-none" style={{ transformOrigin: "140px 70px" }}>
        <ellipse cx="140" cy="70" rx="82" ry="30" fill="none" stroke="rgba(241,231,210,0.45)" strokeWidth="1.5" />
        <circle cx="222" cy="70" r="6" fill="#F1E7D2" />
      </g>
      <g
        className="origin-center animate-orbit-spin motion-reduce:animate-none"
        style={{ transformOrigin: "140px 70px", animationDuration: "11s", animationDirection: "reverse" }}
      >
        <ellipse cx="140" cy="70" rx="54" ry="50" fill="none" stroke="rgba(224,149,77,0.55)" strokeWidth="1.5" />
        <circle cx="140" cy="20" r="5" fill="#E0954D" />
      </g>

      <circle cx="70" cy="46" r="3.5" fill="rgba(241,231,210,0.4)" className="animate-node-pulse motion-reduce:animate-none" />
      <circle cx="208" cy="102" r="3.5" fill="rgba(241,231,210,0.4)" className="animate-node-pulse motion-reduce:animate-none" />
    </svg>
  );
}

const ARTS: Record<ServiceIcon, () => JSX.Element> = {
  web: WebArt,
  app: AppArt,
  ai: AiArt,
};

export default function ServiceArt({ icon }: { icon: ServiceIcon }) {
  const Art = ARTS[icon];
  return <Art />;
}
