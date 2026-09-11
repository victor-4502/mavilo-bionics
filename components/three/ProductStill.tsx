"use client";

import Image from "next/image";
import { PRODUCT_IMAGES } from "@/lib/product-images";
import { useLocale } from "@/lib/locale";
import styles from "./ProductStill.module.css";

type Props = {
  src?: string;
  alt?: string;
  priority?: boolean;
  className?: string;
  showCaption?: boolean;
};

export function ProductStill({
  src = PRODUCT_IMAGES.heroPalm,
  alt,
  priority = false,
  className,
  showCaption = true,
}: Props) {
  const { t } = useLocale();
  const resolvedAlt = alt ?? t.three.productAlt;

  return (
    <div className={`${styles.root} ${className ?? ""}`}>
      <Image
        src={src}
        alt={resolvedAlt}
        fill
        priority={priority}
        sizes="(max-width: 960px) 100vw, 50vw"
        className={styles.image}
      />
      <div className={styles.vignette} aria-hidden />
      {showCaption ? (
        <div className={styles.meta}>
          <p className={styles.label}>{t.three.placeholderLabel}</p>
          <p className={styles.hint}>{t.three.productHint}</p>
        </div>
      ) : null}
    </div>
  );
}
