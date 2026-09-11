"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import { useLocale } from "@/lib/locale";
import styles from "./HandPlaceholder.module.css";

type SceneProps = {
  grip?: number;
  exploded?: number;
};

/** Abstract product stage — not a fake robotic hand. Marks the future GLB volume. */
export function HandPlaceholderScene({ grip = 0, exploded = 0 }: SceneProps) {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);

  const spread = useMemo(() => 0.08 + exploded * 0.22, [exploded]);
  const curl = useMemo(() => grip * 0.35, [grip]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      group.current.rotation.y += delta * 0.12;
    }
    if (core.current) {
      core.current.rotation.x = -0.25 - curl;
    }
  });

  return (
    <group ref={group} position={[0, -0.05, 0]}>
      {/* Palm volume */}
      <mesh ref={core} position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[0.42, 0.55, 0.16]} />
        <meshStandardMaterial
          color="#1a2330"
          metalness={0.15}
          roughness={0.55}
        />
      </mesh>
      {/* Cover / shell hint (eli → PALM_SHELL) */}
      <mesh position={[0, 0.08, 0.1]}>
        <boxGeometry args={[0.38, 0.48, 0.03]} />
        <meshStandardMaterial
          color="#2a3545"
          metalness={0.05}
          roughness={0.45}
        />
      </mesh>
      {/* Four finger proxies — coordinated curl via grip */}
      {[-0.14, -0.05, 0.05, 0.14].map((x, index) => (
        <mesh
          key={x}
          position={[x * (1 + spread), 0.42 - curl * 0.15, 0.02]}
          rotation={[-0.4 - curl - index * 0.02, 0, x * 0.15]}
        >
          <capsuleGeometry args={[0.035, 0.22, 4, 8]} />
          <meshStandardMaterial
            color="#243041"
            metalness={0.1}
            roughness={0.5}
          />
        </mesh>
      ))}
      {/* Thumb proxy */}
      <mesh
        position={[-0.28 - spread * 0.4, 0.05, 0.06]}
        rotation={[0.2, 0.4, 0.9 + curl * 0.4]}
      >
        <capsuleGeometry args={[0.04, 0.16, 4, 8]} />
        <meshStandardMaterial color="#243041" metalness={0.1} roughness={0.5} />
      </mesh>
      {/* Floor contact hint */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.42, 0]}>
        <circleGeometry args={[0.55, 48]} />
        <meshBasicMaterial color="#2bb8e8" transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

type DomProps = {
  staticMode?: boolean;
};

export function HandPlaceholder({ staticMode = false }: DomProps) {
  const { t } = useLocale();

  return (
    <div className={styles.placeholder} data-static={staticMode}>
      <div className={styles.stage} aria-hidden>
        <div className={styles.orb} />
        <div className={styles.plane} />
        <div className={styles.silhouette} />
        <div className={styles.ring} />
      </div>
      <div className={styles.meta}>
        <p className={styles.label}>{t.three.placeholderLabel}</p>
        <p className={styles.hint}>{t.three.placeholderHint}</p>
      </div>
    </div>
  );
}
