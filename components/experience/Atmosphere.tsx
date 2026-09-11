"use client";

import styles from "./Atmosphere.module.css";

export function Atmosphere() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.noise} />
      <div className={styles.wash} data-atmosphere-wash />
      <div className={`${styles.orb} ${styles.orbA}`} data-orb="a" />
      <div className={`${styles.orb} ${styles.orbB}`} data-orb="b" />
      <div className={styles.grid} />
    </div>
  );
}
