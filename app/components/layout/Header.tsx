"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "../../data/navigation";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onNavClick = (href: string) => {
    setOpen(false);
    if (href === "/" && pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!href.startsWith("/#")) return;
    if (pathname !== "/") return;
    const target = document.querySelector(href.slice(1));
    if (!target) return;
    const header = document.querySelector(".site-header") as HTMLElement | null;
    const offset = (header?.offsetHeight ?? 80) + 16;
    const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header" role="banner">
      <div className="container">
        <div className="header-shell">
          <Link
            href="/#hero"
            className="logo"
            aria-label="AusGSTPro Home"
            onClick={(event) => {
              if (pathname === "/") {
                event.preventDefault();
                onNavClick("/#hero");
              } else {
                router.push("/#hero");
              }
            }}
          >
            <span className="logo-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M8 2h8M8 6h8M8 10h8M8 14h8M8 18h8M5 2h0M5 6h0M5 10h0M5 14h0M5 18h0M19 2h0M19 6h0M19 10h0M19 14h0M19 18h0" />
              </svg>
            </span>
            <span className="logo-text">
              <span>AusGST</span>
              <span className="logo-pro">Pro</span>
            </span>
          </Link>

          <nav className={`main-nav ${open ? "open" : ""}`} id="mainNav" aria-label="Primary">
            {navItems.map((item) => {
              const isActive = item.href === "/contact" ? pathname === "/contact" : false;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(event) => {
                    if (item.href.startsWith("/#") && pathname === "/") {
                      event.preventDefault();
                    }
                    onNavClick(item.href);
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/#calculator"
            className="btn btn-header"
            onClick={(event) => {
              if (pathname === "/") {
                event.preventDefault();
                onNavClick("/#calculator");
              } else {
                router.push("/#calculator");
              }
            }}
          >
            Calculate Now
          </Link>

          <button
            className="menu-toggle"
            id="menuToggle"
            aria-expanded={open}
            aria-controls="mainNav"
            aria-label="Toggle menu"
            onClick={() => setOpen((prev) => !prev)}
            type="button"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
