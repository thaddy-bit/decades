type GeocodeResult = { lat: number; lng: number };

/** Géocodage adresse → coordonnées (OpenStreetMap Nominatim, usage modéré). */
export async function geocodeAddress(
  address: string,
): Promise<GeocodeResult | null> {
  const q = address.trim();
  if (!q) return null;

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("format", "json");
    url.searchParams.set("q", q);
    url.searchParams.set("limit", "1");
    url.searchParams.set("countrycodes", "sn");

    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "User-Agent": "LA-DECADES-Website/1.0 (contact map)",
      },
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!res.ok) return null;

    const data = (await res.json()) as { lat: string; lon: string }[];
    const hit = data[0];
    if (!hit) return null;

    const lat = Number.parseFloat(hit.lat);
    const lng = Number.parseFloat(hit.lon);
    if (Number.isNaN(lat) || Number.isNaN(lng)) return null;

    return { lat, lng };
  } catch {
    return null;
  }
}
