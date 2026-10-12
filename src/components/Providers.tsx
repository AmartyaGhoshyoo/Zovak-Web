"use client";

import { ReactNode } from "react";
import { MotionConfig } from "motion/react";

// reducedMotion="user" makes every motion animation respect the visitor's
// OS-level "reduce motion" setting (transforms are skipped, opacity kept).
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </MotionConfig>
  );
}
