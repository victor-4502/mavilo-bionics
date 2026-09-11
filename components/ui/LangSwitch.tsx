"use client";

import { useLocale } from "@/lib/locale";
import type { Locale } from "@/types/hand";
import styles from "./LangSwitch.module.css";

export function LangSwitch() {
  const { locale, setLocale } = useLocale();

  return (
    <div className={styles.switch} role="group" aria-label="Language">
      {(["es", "en"] as Locale[]).map((code) => (
        <button
          key={code}
          type="button"
          className={locale === code ? styles.active : undefined}
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
