"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/direction", label: "La Direction" },
  { href: "/ecoles", label: "Nos Écoles" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

const SIDEBAR_TRANSITION_MS = 320;

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [sidebarMounted, setSidebarMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuActive = sidebarMounted;
  const overlay = isHome && !scrolled && !menuActive;

  const openSidebar = useCallback(() => {
    setSidebarMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setSidebarOpen(true));
    });
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (sidebarMounted && sidebarOpen) {
      closeSidebar();
    } else if (!sidebarMounted) {
      openSidebar();
    }
  }, [sidebarMounted, sidebarOpen, closeSidebar, openSidebar]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  useEffect(() => {
    if (!sidebarMounted || sidebarOpen) return;
    const timer = window.setTimeout(() => setSidebarMounted(false), SIDEBAR_TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [sidebarMounted, sidebarOpen]);

  useEffect(() => {
    if (sidebarMounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarMounted]);

  useEffect(() => {
    if (!sidebarMounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sidebarMounted, closeSidebar]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          overlay
            ? "border-transparent bg-transparent"
            : "border-b border-stone-200/80 bg-white/95 shadow-sm backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-3" onClick={closeSidebar}>
            <BrandLogo
              variant={overlay ? "navbar-overlay" : "navbar"}
              priority
            />
            <div className="hidden sm:block">
              <p
                className={`font-serif text-lg font-semibold leading-tight transition-colors ${
                  overlay ? "text-white" : "text-ink"
                }`}
              >
                LA DECADES
              </p>
              <p
                className={`text-xs transition-colors ${
                  overlay ? "text-white/70" : "text-stone"
                }`}
              >
                Écoles chrétiennes · Sénégal
              </p>
            </div>
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Navigation principale"
          >
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? overlay
                        ? "bg-white text-ink"
                        : "bg-decades-orange text-white"
                      : overlay
                        ? "text-white/90 hover:bg-white/15 hover:text-white"
                        : "text-ink hover:bg-cream hover:text-decades-orange"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-lg border p-2 md:hidden ${
              overlay
                ? "border-white/30 text-white"
                : "border-stone-200 text-ink"
            }`}
            aria-expanded={sidebarOpen}
            aria-controls="mobile-sidebar"
            aria-label={menuActive ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={toggleSidebar}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuActive ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {sidebarMounted && (
        <div className="fixed inset-0 z-[70] md:hidden" role="presentation">
          <button
            type="button"
            className="sidebar-backdrop absolute inset-0 bg-ink/50 backdrop-blur-[2px]"
            data-open={sidebarOpen}
            aria-label="Fermer le menu"
            onClick={closeSidebar}
          />

          <aside
            id="mobile-sidebar"
            className="sidebar-panel absolute right-0 top-0 flex h-full w-[min(88vw,320px)] flex-col bg-white shadow-2xl"
            data-open={sidebarOpen}
            aria-label="Navigation mobile"
            aria-hidden={!sidebarOpen}
          >
            <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
              <Link href="/" className="flex items-center gap-3" onClick={closeSidebar}>
                <BrandLogo variant="sidebar" />
                <div>
                  <p className="font-serif text-base font-semibold text-ink">LA DECADES</p>
                  <p className="text-xs text-stone">Menu</p>
                </div>
              </Link>
              <button
                type="button"
                onClick={closeSidebar}
                className="rounded-lg p-2 text-stone transition hover:bg-cream hover:text-ink"
                aria-label="Fermer"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-1">
                {navLinks.map((link) => {
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeSidebar}
                        className={`flex items-center rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                          active
                            ? "bg-decades-orange text-white"
                            : "text-ink hover:bg-cream hover:text-decades-orange"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-stone-100 p-5">
              <Link
                href="/contact"
                onClick={closeSidebar}
                className="flex w-full items-center justify-center rounded-full bg-decades-orange px-6 py-3 text-sm font-semibold text-white transition hover:bg-decades-orange-dark"
              >
                Nous contacter
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
