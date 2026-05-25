import type { Metadata } from "next";
import Link from "next/link";
import { ContactLocationMap } from "@/components/contact/ContactLocationMap";
import { ContactQuickActions } from "@/components/contact/ContactQuickActions";
import { Button } from "@/components/ui/Button";
import { ImagePageHero } from "@/components/ui/ImagePageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteSettings } from "@/lib/sanity/fetch";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez la direction LA DECADES ou demandez des informations sur nos écoles.",
};

const contactReasons = [
  {
    title: "Inscriptions",
    description: "Informations sur l'admission de votre enfant dans une école du réseau.",
  },
  {
    title: "Partenariat",
    description: "Collaborations institutionnelles, mécénat ou projets communs.",
  },
  {
    title: "Visite d'école",
    description: "Organiser une visite ou une journée portes ouvertes.",
  },
  {
    title: "Presse & médias",
    description: "Demandes de communication ou couverture d'événements.",
  },
];

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <ImagePageHero
        label="Nous joindre"
        title="Contact"
        description="Inscriptions, partenariats ou toute question — l'équipe LA DECADES vous accompagne."
        imageUrl={settings.contactHeroImageUrl}
        size="tall"
      />

      {/* Accès rapide */}
      <section className="border-b border-stone-200 bg-white py-10 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-sm font-bold uppercase tracking-[0.2em] text-decades-orange">
            Contact rapide
          </p>
          <ContactQuickActions
            phone={settings.contactPhone}
            email={settings.contactEmail}
          />
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-gradient-to-b from-cream/40 to-white py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            label="LA DECADES"
            title="Comment pouvons-nous vous aider ?"
            description={settings.contactIntro}
            align="center"
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Coordonnées */}
            <aside className="lg:col-span-5">
              <div className="sticky top-28 space-y-8">
                <div className="overflow-hidden rounded-2xl bg-ink p-8 text-cream shadow-lg">
                  <h2 className="font-serif text-2xl font-semibold">
                    Direction centrale
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-cream/75">
                    Pour toute demande concernant le réseau ou une école en
                    particulier.
                  </p>
                  <dl className="mt-8 space-y-6">
                    {settings.contactAddress && (
                      <div className="flex gap-4">
                        <span className="text-decades-orange" aria-hidden>
                          <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </span>
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-wide text-decades-orange">
                            Adresse
                          </dt>
                          <dd className="mt-1 text-sm">{settings.contactAddress}</dd>
                        </div>
                      </div>
                    )}
                    {settings.contactPhone && (
                      <div className="flex gap-4">
                        <span className="text-decades-orange" aria-hidden>
                          <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </span>
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-wide text-decades-orange">
                            Téléphone
                          </dt>
                          <dd className="mt-1">
                            <a
                              href={`tel:${settings.contactPhone}`}
                              className="text-sm font-medium hover:underline"
                            >
                              {settings.contactPhone}
                            </a>
                          </dd>
                        </div>
                      </div>
                    )}
                    {settings.contactEmail && (
                      <div className="flex gap-4">
                        <span className="text-decades-orange" aria-hidden>
                          <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </span>
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-wide text-decades-orange">
                            E-mail
                          </dt>
                          <dd className="mt-1">
                            <a
                              href={`mailto:${settings.contactEmail}`}
                              className="break-all text-sm font-medium hover:underline"
                            >
                              {settings.contactEmail}
                            </a>
                          </dd>
                        </div>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="rounded-2xl border border-stone-200/80 bg-cream/40 p-6">
                  <h3 className="font-serif text-lg font-semibold text-ink">
                    Motifs de contact fréquents
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {contactReasons.map((reason) => (
                      <li key={reason.title}>
                        <p className="font-medium text-ink">{reason.title}</p>
                        <p className="mt-0.5 text-sm text-stone">
                          {reason.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button href="/ecoles" variant="outline" className="w-full justify-center">
                  Trouver une école près de chez vous
                </Button>
              </div>
            </aside>

            {/* Formulaire */}
            <div className="lg:col-span-7">
              <form
                className="rounded-2xl border border-stone-200/80 bg-white p-8 shadow-lg sm:p-10"
                action="#"
                method="post"
              >
                <SectionHeading
                  label="Formulaire"
                  title="Envoyer un message"
                  description="Remplissez le formulaire ci-dessous. Nous vous répondrons dans les meilleurs délais."
                />
                <div className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-ink">
                        Nom complet *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        className="mt-2 w-full rounded-xl border border-stone-200 bg-background px-4 py-3 text-sm transition focus:border-decades-orange focus:outline-none focus:ring-2 focus:ring-decades-orange/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-ink">
                        E-mail *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="mt-2 w-full rounded-xl border border-stone-200 bg-background px-4 py-3 text-sm transition focus:border-decades-orange focus:outline-none focus:ring-2 focus:ring-decades-orange/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-ink">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className="mt-2 w-full rounded-xl border border-stone-200 bg-background px-4 py-3 text-sm transition focus:border-decades-orange focus:outline-none focus:ring-2 focus:ring-decades-orange/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-ink">
                      Objet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="mt-2 w-full rounded-xl border border-stone-200 bg-background px-4 py-3 text-sm focus:border-decades-orange focus:outline-none focus:ring-2 focus:ring-decades-orange/20"
                    >
                      <option value="inscription">Inscription</option>
                      <option value="partenariat">Partenariat</option>
                      <option value="visite">Visite d&apos;école</option>
                      <option value="information">Information générale</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-ink">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      placeholder="Décrivez votre demande…"
                      className="mt-2 w-full resize-y rounded-xl border border-stone-200 bg-background px-4 py-3 text-sm focus:border-decades-orange focus:outline-none focus:ring-2 focus:ring-decades-orange/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-decades-orange px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-decades-orange-dark sm:w-auto"
                  >
                    Envoyer le message
                  </button>
                  <p className="text-xs text-stone">
                    * Champs obligatoires. Le formulaire sera connecté à un
                    service d&apos;e-mail lors du déploiement.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-gradient-to-b from-cream/50 to-white py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Localisation"
            title="Où nous trouver"
            description="Siège de la direction LA DECADES — plan pour vous rendre sur place."
            align="center"
          />
          <div className="mt-8">
            <ContactLocationMap
              address={settings.contactAddress}
              lat={settings.contactMapLat}
              lng={settings.contactMapLng}
              zoom={settings.contactMapZoom}
            />
          </div>
        </div>
      </section>

      {/* Liens utiles */}
      <section className="border-t border-stone-200 bg-ink py-14 text-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <p className="w-full font-serif text-xl sm:w-auto sm:text-2xl">
            Explorez le réseau
          </p>
          <Link
            href="/direction"
            className="rounded-full border border-cream/30 px-6 py-2.5 text-sm font-medium transition hover:bg-cream/10"
          >
            La Direction
          </Link>
          <Link
            href="/actualites"
            className="rounded-full border border-cream/30 px-6 py-2.5 text-sm font-medium transition hover:bg-cream/10"
          >
            Actualités
          </Link>
          <Link
            href="/ecoles"
            className="rounded-full border border-cream/30 px-6 py-2.5 text-sm font-medium transition hover:bg-cream/10"
          >
            Nos écoles
          </Link>
        </div>
      </section>
    </>
  );
}
