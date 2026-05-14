import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ausgstpro.com";
  return [
    "",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/about-us",
    "/affiliate-disclosure"
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date()
  }));
}
