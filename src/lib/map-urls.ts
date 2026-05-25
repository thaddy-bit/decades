type MapLocation = {
  address?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
};

export type MapCoordinates = { lat: number; lng: number };

export function resolveMapCoordinates(
  lat?: number,
  lng?: number,
): MapCoordinates | null {
  if (
    typeof lat === "number" &&
    typeof lng === "number" &&
    !Number.isNaN(lat) &&
    !Number.isNaN(lng)
  ) {
    return { lat, lng };
  }
  return null;
}

export function hasMapCoordinates(lat?: number, lng?: number): boolean {
  return resolveMapCoordinates(lat, lng) !== null;
}

/** Carte intégrée OpenStreetMap (fiable sans clé API). */
export function getOsmEmbedUrl(lat: number, lng: number, zoom = 15): string {
  const span = zoom >= 16 ? 0.008 : zoom >= 14 ? 0.02 : zoom >= 12 ? 0.05 : 0.12;
  const bbox = [lng - span, lat - span, lng + span, lat + span].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lng}`;
}

/** Lien Google Maps (itinéraire / app mobile). */
export function getGoogleMapsOpenUrl({
  address,
  lat,
  lng,
}: MapLocation): string | null {
  if (hasMapCoordinates(lat, lng)) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  const q = address?.trim();
  if (q) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  }
  return null;
}

export function getOsmViewUrl(lat: number, lng: number, zoom = 15): string {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`;
}
