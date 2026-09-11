import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { LocaleProvider } from "@/lib/locale";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mavilobionics.com"),
  title: {
    default: "Mavilo Bionics — Ingeniería biónica",
    template: "%s · Mavilo Bionics",
  },
  description:
    "Mavilo Bionics desarrolla Mav 1, una mano biónica de precisión. Ingeniería mexicana aplicada a la movilidad humana.",
  applicationName: "Mavilo Bionics",
  authors: [{ name: "Mavilo Bionics" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    alternateLocale: ["en_US"],
    url: "https://mavilobionics.com",
    siteName: "Mavilo Bionics",
    title: "Mavilo Bionics — Ingeniería biónica",
    description:
      "Mav 1: mano biónica de precisión. Ingeniería mexicana aplicada a la movilidad humana.",
    images: [
      {
        url: "/images/og/og-default.jpg",
        width: 1200,
        height: 1200,
        alt: "Mavilo Mav 1 bionic hand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mavilo Bionics",
    description:
      "Mav 1: mano biónica de precisión. Ingeniería mexicana aplicada a la movilidad humana.",
    images: ["/images/og/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050B14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${GeistSans.variable}`}>
      <body className={GeistSans.className}>
        <LocaleProvider>
          <a className="skip-link" href="#hero">
            Skip to content
          </a>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
