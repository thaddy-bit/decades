"use client";

import Link from "next/link";
import {
  mobileNavLinkDefs,
  MobileSidebar,
} from "@/components/layout/MobileSidebar";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const navLinks = mobileNavLinkDefs.map(({ href, label }) => ({ href, label }));

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

      <MobileSidebar
        mounted={sidebarMounted}
        open={sidebarOpen}
        pathname={pathname}
        onClose={closeSidebar}
      />
    </>
  );
}
