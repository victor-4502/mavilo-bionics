"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { useLocale } from "@/lib/locale";
import styles from "./SiteHeader.module.css";

const NAV = [
  { href: "#mano", key: "product" as const },
  { href: "#senal", key: "technology" as const },
  { href: "#ecosistema", key: "application" as const },
  { href: "#contacto", key: "contact" as const },
];

export function SiteHeader() {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="#hero" className={styles.brand} onClick={close}>
          <Image
            src="/images/brand/mavilo_logo.png"
            alt="Mavilo Bionics"
            width={140}
            height={36}
            className={styles.logo}
            priority
          />
          <span className="sr-only">Mavilo Bionics</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {t.nav[item.key]}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <LangSwitch />
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={styles.menuIcon} data-open={open} aria-hidden />
          </button>
        </div>
      </div>

      <div
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        id={panelId}
        hidden={!open}
      >
        <div
          className={styles.backdrop}
          onClick={close}
          aria-hidden
        />
        <nav className={styles.drawerPanel} aria-label="Mobile">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={close}>
              {t.nav[item.key]}
            </a>
          ))}
          <a href="#hero" onClick={close}>
            {t.nav.home}
          </a>
        </nav>
      </div>
    </header>
  );
}
