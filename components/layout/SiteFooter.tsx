"use client";

import { useLocale } from "@/lib/locale";
import styles from "./SiteFooter.module.css";

const PRIVACY_URL = "https://victor-4502.github.io/mavilo-mav-1-privacy/";

export function SiteFooter() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.brand}>Mavilo Bionics</p>
          <p className={styles.tagline}>{t.footer.tagline}</p>
        </div>
        <a
          className={styles.privacy}
          href={PRIVACY_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          {t.footer.privacy}
        </a>
        <p className={styles.copy}>
          © {year} Mavilo Bionics. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
