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
    btn.classList.toggle("is-on", btn.dataset.langBtn === lang);
  });
}

function applyTranslations(lang) {
  const copy = translations[lang];
  if (!copy) return;

  document.title = copy.metaTitle;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = copy.metaDescription;

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = copy.metaTitle;
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = copy.metaDescription;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = copy[key];
    if (value != null) el.textContent = value;
  });

  document.querySelectorAll("#contact-email, #contact-email-top").forEach((link) => {
    link.href = `mailto:${copy.contactEmail}`;
    link.textContent = copy.contactEmail;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setLang(getLang());

  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.langBtn));
  });

  const privacy = document.getElementById("privacy-link");
  if (privacy) privacy.href = PRIVACY_URL;

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
});
