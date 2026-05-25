"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";

type MobileSidebarProps = {
  open: boolean;
  mounted: boolean;
  pathname: string;
  onClose: () => void;
};

function NavIcon({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${
        active
          ? "bg-white/20 text-white ring-white/30"
          : "bg-cream/80 text-decades-orange ring-stone-200/60"
      }`}
      aria-hidden
    >
      {children}
    </span>
  );
}

const icons = {
  home: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  direction: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  schools: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824 2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  news: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  ),
  contact: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

export const mobileNavLinkDefs = [
  { href: "/", label: "Accueil", icon: icons.home },
  { href: "/direction", label: "La Direction", icon: icons.direction },
  { href: "/ecoles", label: "Nos Écoles", icon: icons.schools },
  { href: "/actualites", label: "Actualités", icon: icons.news },
  { href: "/contact", label: "Contact", icon: icons.contact },
] as const;

export function MobileSidebar({
  open,
  mounted,
  pathname,
  onClose,
}: MobileSidebarProps) {
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[70] md:hidden" role="presentation">
      <button
        type="button"
        className="sidebar-backdrop absolute inset-0 bg-ink/60 backdrop-blur-sm"
        data-open={open}
        aria-label="Fermer le menu"
        onClick={onClose}
      />

      <aside
        id="mobile-sidebar"
        className="sidebar-panel absolute right-0 top-0 flex h-full w-[min(90vw,340px)] flex-col overflow-hidden bg-white shadow-2xl ring-1 ring-stone-200/50"
        data-open={open}
        aria-label="Navigation mobile"
        aria-hidden={!open}
      >
        {/* En-tête */}
        <div className="relative shrink-0 bg-ink px-5 pb-6 pt-5 text-cream">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-decades-orange/25 via-transparent to-transparent"
            aria-hidden
          />
          <div className="relative flex items-start justify-between gap-3">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-3"
              onClick={onClose}
            >
              <BrandLogo variant="navbar-overlay" />
              <div className="min-w-0">
                <p className="font-serif text-lg font-semibold leading-tight">
                  LA DECADES
                </p>
                <p className="mt-0.5 text-xs text-cream/70">
                  Écoles chrétiennes · Sénégal
                </p>
              </div>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full bg-cream/10 p-2.5 text-cream transition hover:bg-cream/20"
              aria-label="Fermer le menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col overflow-y-auto">
          <p className="px-5 pt-5 text-xs font-bold uppercase tracking-[0.2em] text-decades-orange">
            Navigation
          </p>
          <ul className="sidebar-nav-list px-3 py-3">
            {mobileNavLinkDefs.map((link, index) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li
                  key={link.href}
                  className="sidebar-nav-item"
                  style={{ animationDelay: `${80 + index * 45}ms` }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all ${
                      active
                        ? "bg-decades-orange text-white shadow-md shadow-decades-orange/20"
                        : "text-ink hover:bg-cream"
                    }`}
                  >
                    <NavIcon active={active}>{link.icon}</NavIcon>
                    <span className="flex-1 text-[15px] font-semibold">{link.label}</span>
                    {active && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-white" aria-hidden />
                    )}
                    {!active && (
                      <svg
                        className="h-4 w-4 shrink-0 text-stone/40 transition group-hover:translate-x-0.5 group-hover:text-decades-orange"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mx-5 border-t border-stone-100" />

          <p className="px-5 pt-4 text-xs font-bold uppercase tracking-[0.2em] text-stone">
            Accès rapide
          </p>
          <ul className="sidebar-nav-list px-3 py-2 pb-4">
            <li className="sidebar-nav-item" style={{ animationDelay: "320ms" }}>
              <Link
                href="/actualites?type=evenement"
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-stone transition hover:bg-cream hover:text-ink"
              >
                Événements du réseau
              </Link>
            </li>
            <li className="sidebar-nav-item" style={{ animationDelay: "365ms" }}>
              <Link
                href="/ecoles"
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-stone transition hover:bg-cream hover:text-ink"
              >
                Trouver une école
              </Link>
            </li>
          </ul>
        </nav>

        {/* Pied */}
        <div className="shrink-0 border-t border-stone-100 bg-gradient-to-t from-cream/60 to-white p-5">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-decades-orange px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-decades-orange/25 transition hover:bg-decades-orange-dark"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Nous contacter
          </Link>
          <p className="mt-4 text-center text-[11px] leading-relaxed text-stone">
            Direction d&apos;écoles chrétiennes des Assemblées de Dieu au Sénégal
          </p>
        </div>
      </aside>
    </div>
  );
}
