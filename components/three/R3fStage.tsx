"use client";

import { Canvas } from "@react-three/fiber";
import { MODEL_PATHS } from "@/lib/glb-contract";
import type { HandExperienceProps } from "@/types/hand";
import { HandPlaceholderScene } from "./HandPlaceholder";

type Props = Pick<
  HandExperienceProps,
  | "grip"
  | "exploded"
  | "handState"
  | "modelHero"
  | "modelExplore"
  | "modelMobile"
>;

/**
 * Lightweight R3F stage. GLB swap will happen here later via useGLTF(MODEL_PATHS.*).
 * Paths are wired so the future model drop-in is a single-file change.
 */
export function R3fStage({
  grip = 0,
  exploded = 0,
  handState = "hero",
  modelHero = MODEL_PATHS.hero,
  modelExplore = MODEL_PATHS.explore,
  modelMobile = MODEL_PATHS.mobile,
}: Props) {
  // Reserved for future LOD selection — keep referenced so contract stays live.
  void modelHero;
  void modelExplore;
  void modelMobile;
  void handState;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0.55, 0.2, 1.35], fov: 35, near: 0.1, far: 20 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop="always"
    >
      <color attach="background" args={["#050b14"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[2.5, 3, 2]} intensity={0.85} color="#e8f4ff" />
      <directionalLight position={[-2, 1, -1]} intensity={0.35} color="#2bb8e8" />
      <HandPlaceholderScene grip={grip} exploded={exploded} />
    </Canvas>
  );
}
