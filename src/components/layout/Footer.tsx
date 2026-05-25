import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/sanity/fetch";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/direction", label: "La Direction" },
  { href: "/ecoles", label: "Nos Écoles" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

const quickLinks = [
  { href: "/ecoles", label: "Trouver une école" },
  { href: "/actualites?type=evenement", label: "Événements" },
  { href: "/actualites?type=annonce", label: "Annonces" },
  { href: "/contact", label: "Inscriptions" },
];

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-cream/80 transition-colors hover:text-decades-orange"
    >
      {children}
    </Link>
  );
}

export async function Footer() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();
  const whatsappHref = settings.contactPhone
    ? `https://wa.me/${settings.contactPhone.replace(/\D/g, "")}`
    : null;

  return (
    <footer className="mt-auto bg-ink text-cream">
      {/* Bandeau accent */}
      <div className="h-1 w-full bg-gradient-to-r from-decades-orange via-decades-orange/80 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Marque */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-4">
              <Image
                src="/logo.png"
                alt=""
                width={52}
                height={68}
                className="h-12 object-contain brightness-0 invert"
                style={{ width: "auto", height: "auto" }}
              />
              <div>
                <p className="font-serif text-xl font-semibold tracking-tight">
                  LA DECADES
                </p>
                <p className="text-xs text-cream/60">Écoles chrétiennes · Sénégal</p>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/75">
              {settings.tagline ??
                "Direction d'écoles chrétiennes au Sénégal — un réseau uni par la foi, l'excellence et l'accompagnement de chaque enfant."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/15 px-4 py-2 text-xs font-semibold text-[#25D366] ring-1 ring-[#25D366]/30 transition hover:bg-[#25D366]/25"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-cream/20 px-4 py-2 text-xs font-semibold text-cream/90 transition hover:border-decades-orange hover:text-decades-orange"
              >
                Nous écrire
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-decades-orange">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens utiles */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-decades-orange">
              Liens utiles
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-decades-orange">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-cream/80">
              {settings.contactAddress && (
                <li className="flex gap-3">
                  <span className="mt-0.5 text-decades-orange" aria-hidden>
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <span className="leading-relaxed">{settings.contactAddress}</span>
                </li>
              )}
              {settings.contactPhone && (
                <li className="flex gap-3">
                  <span className="mt-0.5 text-decades-orange" aria-hidden>
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <a
                    href={`tel:${settings.contactPhone}`}
                    className="transition hover:text-decades-orange"
                  >
                    {settings.contactPhone}
                  </a>
                </li>
              )}
              {settings.contactEmail && (
                <li className="flex gap-3">
                  <span className="mt-0.5 text-decades-orange" aria-hidden>
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="break-all transition hover:text-decades-orange"
                  >
                    {settings.contactEmail}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Barre inférieure */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 sm:flex-row">
          <p className="text-center text-xs text-cream/50 sm:text-left">
            © {year} LA DECADES — Tous droits réservés · République du Sénégal
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-cream/50">
            <span className="hidden sm:inline text-cream/30">|</span>
            <Link
              href="/studio"
              className="transition hover:text-cream/80"
            >
              Administration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
