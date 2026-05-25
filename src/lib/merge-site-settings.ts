import { fallbackSettings } from "./data/fallback";
import type { SiteSettings } from "./sanity/types";

/** Complète les champs manquants quand Sanity renvoie un document partiel. */
export function mergeSiteSettings(
  settings: SiteSettings | null | undefined,
): SiteSettings {
  if (!settings) return fallbackSettings;

  return {
    ...fallbackSettings,
    ...settings,
    values:
      settings.values && settings.values.length > 0
        ? settings.values
        : fallbackSettings.values,
    contactAddress:
      settings.contactAddress?.trim() || fallbackSettings.contactAddress,
    contactMapLat:
      settings.contactMapLat ?? fallbackSettings.contactMapLat,
    contactMapLng:
      settings.contactMapLng ?? fallbackSettings.contactMapLng,
    contactMapZoom:
      settings.contactMapZoom ?? fallbackSettings.contactMapZoom,
  };
}
