const PRIVACY_URL = "https://victor-4502.github.io/mavilo-ara-1-privacy/";
const LANG_KEY = "mavilo-lang";

function getLang() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === "es" || saved === "en") return saved;
  const browser = navigator.language?.toLowerCase() ?? "es";
  return browser.startsWith("en") ? "en" : "es";
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  applyTranslations(lang);
  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.langBtn === lang);
    btn.setAttribute("aria-pressed", btn.dataset.langBtn === lang ? "true" : "false");
  });
}

function applyTranslations(lang) {
  const copy = translations[lang];
  if (!copy) return;

  document.title = copy.metaTitle;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = copy.metaDescription;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = copy[key];
    if (value == null) return;
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.placeholder = value;
    } else {
      el.textContent = value;
    }
  });

  const emailLink = document.getElementById("contact-email");
  if (emailLink) {
    emailLink.href = `mailto:${copy.contactEmail}`;
    emailLink.textContent = copy.contactEmail;
  }
}

function setupNav() {
  const header = document.querySelector(".site-header");
  const toggle = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = getLang();
  setLang(lang);

  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.langBtn));
  });

  const privacy = document.getElementById("privacy-link");
  if (privacy) privacy.href = PRIVACY_URL;

  setupNav();
  setupReveal();
});
