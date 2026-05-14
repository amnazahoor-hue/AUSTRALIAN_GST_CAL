import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/pages/contact.html", destination: "/contact", permanent: true },
      { source: "/pages/privacy.html", destination: "/privacy", permanent: true },
      { source: "/pages/terms.html", destination: "/terms", permanent: true },
      { source: "/pages/disclaimer.html", destination: "/disclaimer", permanent: true },
      { source: "/pages/about-us.html", destination: "/about-us", permanent: true },
      { source: "/pages/affiliate-disclosure.html", destination: "/affiliate-disclosure", permanent: true }
    ];
  }
};

export default nextConfig;
