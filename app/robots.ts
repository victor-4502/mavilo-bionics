import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://mavilobionics.com/sitemap.xml",
    host: "https://mavilobionics.com",
  };
}
