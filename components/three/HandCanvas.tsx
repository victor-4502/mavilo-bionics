"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { GLB_READY, fallbackForHandState } from "@/lib/product-images";
import type { HandExperienceProps } from "@/types/hand";
import { HandPlaceholder } from "./HandPlaceholder";
import { ProductStill } from "./ProductStill";
import styles from "./HandCanvas.module.css";

const R3fStage = dynamic(() => import("./R3fStage").then((m) => m.R3fStage), {
  ssr: false,
  loading: () => null,
});

type Props = Pick<
  HandExperienceProps,
  | "grip"
  | "exploded"
  | "handState"
  | "modelHero"
  | "modelExplore"
  | "modelMobile"
  | "fallbackImage"
  | "preferStill"
>;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HandCanvas(props: Props) {
  const {
    handState = "hero",
    fallbackImage,
    preferStill = !GLB_READY,
  } = props;

  const [webglOk, setWebglOk] = useState(true);
  const [reduced, setReduced] = useState(false);

  const stillSrc = fallbackImage ?? fallbackForHandState(handState);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebglOk(Boolean(gl));
    } catch {
      setWebglOk(false);
    }
  }, []);

  const useStill = preferStill || !webglOk || reduced || !GLB_READY;

  if (useStill) {
    return (
      <div className={styles.fallback}>
        <ProductStill src={stillSrc} priority={handState === "hero"} />
      </div>
    );
  }

  return (
    <div className={styles.canvasHost}>
      <Suspense fallback={<HandPlaceholder />}>
        <R3fStage {...props} />
      </Suspense>
    </div>
  );
}
