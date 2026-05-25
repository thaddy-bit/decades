import { geocodeAddress } from "@/lib/geocode";
import {
  getGoogleMapsOpenUrl,
  getOsmEmbedUrl,
  getOsmViewUrl,
  resolveMapCoordinates,
} from "@/lib/map-urls";

type ContactLocationMapProps = {
  address?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
};

export async function ContactLocationMap({
  address,
  lat,
  lng,
  zoom = 15,
}: ContactLocationMapProps) {
  let coords = resolveMapCoordinates(lat, lng);

  if (!coords && address?.trim()) {
    coords = await geocodeAddress(address);
  }

  if (!coords) {
    return (
      <p className="rounded-2xl border border-dashed border-stone-200 bg-cream/40 px-6 py-10 text-center text-sm text-stone">
        Carte indisponible : renseignez l&apos;adresse ou les coordonnées GPS dans
        Sanity (Page — Contact).
      </p>
    );
  }

  const { lat: mapLat, lng: mapLng } = coords;
  const embedUrl = getOsmEmbedUrl(mapLat, mapLng, zoom);
  const googleUrl = getGoogleMapsOpenUrl({ address, lat: mapLat, lng: mapLng });
  const osmUrl = getOsmViewUrl(mapLat, mapLng, zoom);

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-stone-200/80">
      <div className="relative h-64 w-full bg-stone-100 sm:h-72 md:h-80 lg:h-96">
        <iframe
          src={embedUrl}
          title="Carte — localisation LA DECADES"
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 bg-cream/40 px-4 py-3 sm:px-5">
        {address && (
          <p className="text-sm text-stone">
            <span className="font-semibold text-ink">Adresse :</span> {address}
          </p>
        )}
        <div className="flex flex-wrap gap-4">
          {googleUrl && (
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-decades-orange transition hover:text-decades-orange-dark"
            >
              Google Maps
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          <a
            href={osmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-stone transition hover:text-ink"
          >
            Plan détaillé
          </a>
        </div>
      </div>
    </div>
  );
}
