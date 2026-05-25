"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DecadesLogo } from "@/components/ui/DecadesLogo";

type ContactInfo = {
  phone?: string;
  email?: string;
};

const quickTopics = [
  {
    label: "Inscriptions",
    reply:
      "Pour les inscriptions, contactez-nous par WhatsApp, téléphone ou e-mail, ou via le formulaire.",
    href: "/contact",
  },
  {
    label: "Trouver une école",
    reply: "Consultez la liste de nos établissements par ville.",
    href: "/ecoles",
  },
  {
    label: "Actualités",
    reply: "Suivez les annonces et événements du réseau.",
    href: "/actualites",
  },
  {
    label: "La Direction",
    reply: "Découvrez notre mission, vision et valeurs.",
    href: "/direction",
  },
];

export function CommunicationWidget({ contact }: { contact: ContactInfo }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const phoneDigits = contact.phone?.replace(/\D/g, "") ?? "";
  const whatsappHref = phoneDigits
    ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent(
        "Bonjour LA DECADES, je souhaite obtenir des informations.",
      )}`
    : null;

  const hasDirectContact = Boolean(whatsappHref || contact.phone || contact.email);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <div
        className={`origin-bottom-right transition-all duration-300 ease-out ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
        role="dialog"
        aria-label="Assistant LA DECADES"
        aria-hidden={!open}
      >
        <div className="flex w-[min(100vw-2.5rem,380px)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-stone-200/80">
          <div className="bg-ink px-5 py-4 text-cream">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-decades-orange">
                  Besoin d&apos;aide ?
                </p>
                <h2 className="mt-1 font-serif text-lg font-semibold">
                  Assistant LA DECADES
                </h2>
                <p className="mt-1 text-xs text-cream/70">
                  WhatsApp · Téléphone · E-mail
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-cream/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Fermer"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="max-h-[min(60vh,440px)] overflow-y-auto p-4">
            <div className="rounded-2xl rounded-tl-sm bg-cream/80 px-4 py-3 text-sm leading-relaxed text-ink">
              Bonjour 👋 Contactez la direction comme vous préférez :{" "}
              <strong>WhatsApp</strong>, <strong>appel</strong> ou{" "}
              <strong>e-mail</strong>. Nous vous répondons dès que possible.
            </div>

            {/* Canaux de contact — priorité */}
            {hasDirectContact && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-stone">
                  Joindre la direction
                </p>
                <div className="space-y-2">
                  {whatsappHref && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center gap-3 rounded-xl bg-[#25D366] px-4 py-3.5 text-white transition hover:opacity-90"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </span>
                      <span className="min-w-0 text-left">
                        <span className="block text-sm font-semibold">WhatsApp</span>
                        <span className="block text-xs text-white/85">Message direct</span>
                      </span>
                    </a>
                  )}

                  {contact.phone && (
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex w-full items-center gap-3 rounded-xl border-2 border-decades-orange/30 bg-cream/40 px-4 py-3.5 transition hover:border-decades-orange hover:bg-cream"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-decades-orange/15 text-decades-orange">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </span>
                      <span className="min-w-0 text-left">
                        <span className="block text-sm font-semibold text-ink">Appeler</span>
                        <span className="block truncate text-xs text-stone">{contact.phone}</span>
                      </span>
                    </a>
                  )}

                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex w-full items-center gap-3 rounded-xl border-2 border-stone-200 px-4 py-3.5 transition hover:border-decades-orange hover:bg-cream/50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-decades-orange">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <span className="min-w-0 text-left">
                        <span className="block text-sm font-semibold text-ink">E-mail</span>
                        <span className="block truncate text-xs text-stone">{contact.email}</span>
                      </span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {message && (
              <div className="mt-4 rounded-2xl rounded-tr-sm bg-decades-orange/10 px-4 py-3 text-sm leading-relaxed text-ink ring-1 ring-decades-orange/20">
                {message}
                {quickTopics
                  .filter((t) => t.reply === message)
                  .map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      onClick={() => setOpen(false)}
                      className="mt-2 block text-sm font-semibold text-decades-orange hover:underline"
                    >
                      Voir la page →
                    </Link>
                  ))}
              </div>
            )}

            <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-wide text-stone">
              Questions fréquentes
            </p>
            <div className="flex flex-wrap gap-2">
              {quickTopics.map((topic) => (
                <button
                  key={topic.label}
                  type="button"
                  onClick={() => setMessage(topic.reply)}
                  className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-ink transition hover:border-decades-orange hover:text-decades-orange"
                >
                  {topic.label}
                </button>
              ))}
            </div>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 flex w-full items-center justify-center rounded-xl border border-dashed border-stone-300 px-4 py-2.5 text-xs font-medium text-stone transition hover:border-decades-orange hover:text-decades-orange"
            >
              Ou utiliser le formulaire de contact →
            </Link>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          if (open) setMessage(null);
        }}
        className={`group relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all sm:h-16 sm:w-16 ${
          open
            ? "bg-ink text-white ring-2 ring-decades-orange"
            : "bg-decades-orange text-white hover:bg-decades-orange-dark hover:shadow-xl hover:shadow-decades-orange/30"
        }`}
        aria-expanded={open}
        aria-label={open ? "Fermer l'assistant" : "Contacter LA DECADES — WhatsApp, appel ou e-mail"}
      >
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-decades-orange opacity-60" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-decades-orange ring-2 ring-white" />
          </span>
        )}
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white p-1.5 shadow-inner">
            <DecadesLogo size="sm" className="max-h-full max-w-full" />
          </span>
        )}
      </button>
    </div>
  );
}
