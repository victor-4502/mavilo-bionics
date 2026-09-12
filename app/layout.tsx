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
    default: "MAVILO Bionics — Ingeniería biónica mexicana",
    template: "%s · MAVILO Bionics",
  },
  description:
    "MAVILO Bionics desarrolla MAV 1, una prótesis mioeléctrica de mano. Ingeniería mexicana: mecánica, control, electrónica y software.",
  applicationName: "MAVILO Bionics",
  authors: [{ name: "MAVILO Bionics" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    alternateLocale: ["en_US"],
    url: "https://mavilobionics.com",
    siteName: "MAVILO Bionics",
    title: "MAVILO Bionics — Ingeniería biónica mexicana",
    description:
      "MAV 1: prótesis mioeléctrica de mano. Ingeniería mexicana aplicada a la movilidad humana.",
    images: [
      {
        url: "/images/og/og-default.jpg",
        width: 1200,
        height: 1200,
        alt: "MAVILO MAV 1 bionic hand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAVILO Bionics",
    description:
      "MAV 1: prótesis mioeléctrica de mano. Ingeniería mexicana aplicada a la movilidad humana.",
    images: ["/images/og/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MAVILO Bionics",
  url: "https://mavilobionics.com",
  email: "contacto@mavilobionics.com",
  logo: "https://mavilobionics.com/images/brand/mavilo_logo.png",
  description:
    "Mexican bionics company developing the MAV 1 myoelectric prosthetic hand.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
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
