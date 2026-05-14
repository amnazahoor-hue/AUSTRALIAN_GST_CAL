import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ausgstpro.com"),
  title: "AusGSTPro | Australian GST Calculator",
  description:
    "Australia's most accurate GST calculator. Add or remove 10% GST instantly with ATO-compliant precision.",
  openGraph: {
    title: "AusGSTPro | Australian GST Calculator",
    description: "Calculate GST instantly with ATO-compliant precision.",
    url: "https://ausgstpro.com",
    siteName: "AusGSTPro",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
