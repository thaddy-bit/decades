import { directionPageDefaults } from "./direction-page-defaults";
import type { SiteSettings } from "./sanity/types";

function str(
  value: string | undefined,
  fallback: string,
): string {
  return value?.trim() ? value.trim() : fallback;
}

/** Contenu page Direction : Sanity + valeurs par défaut. */
export function resolveDirectionContent(settings: SiteSettings) {
  const d = directionPageDefaults;

  return {
    hero: {
      label: str(settings.directionHeroLabel, d.directionHeroLabel),
      title: str(settings.directionHeroTitle, d.directionHeroTitle),
      description: str(
        settings.directionHeroDescription,
        settings.fullName ?? d.directionHeroDescription,
      ),
      imageUrl: settings.directionHeroImageUrl,
    },
    history: {
      sectionLabel: str(settings.historySectionLabel, d.historySectionLabel),
      title: str(settings.historyTitle, d.historyTitle),
      intro: str(settings.historyIntro, d.historyIntro),
      body: settings.history,
      imageUrl: settings.historyImageUrl,
      imageCaption: str(settings.historyImageCaption, d.historyImageCaption),
      foundedYear: settings.foundedYear,
      acronymMeaning: str(settings.acronymMeaning, d.acronymMeaning),
    },
    mission: {
      label: str(settings.missionSectionLabel, d.missionSectionLabel),
      title: str(settings.missionSectionTitle, d.missionSectionTitle),
      text: str(settings.mission, d.mission),
    },
    vision: {
      label: str(settings.visionSectionLabel, d.visionSectionLabel),
      title: str(settings.visionSectionTitle, d.visionSectionTitle),
      text: str(settings.vision, d.vision),
    },
    identity: {
      label: str(settings.identitySectionLabel, d.identitySectionLabel),
      title: str(settings.identitySectionTitle, d.identitySectionTitle),
      description: str(settings.identityDescription, d.identityDescription),
      quote: str(settings.identityQuote, d.identityQuote),
      buttonLabel: str(settings.identityButtonLabel, d.identityButtonLabel),
      buttonHref: str(settings.identityButtonHref, d.identityButtonHref),
    },
    values: {
      label: str(settings.valuesSectionLabel, d.valuesSectionLabel),
      title: str(settings.valuesSectionTitle, d.valuesSectionTitle),
      description: str(
        settings.valuesSectionDescription,
        d.valuesSectionDescription,
      ),
      items:
        settings.values && settings.values.length > 0
          ? settings.values
          : [...d.values],
    },
    about: {
      label: str(settings.aboutSectionLabel, d.aboutSectionLabel),
      title: str(settings.aboutSectionTitle, d.aboutSectionTitle),
      body: settings.about,
    },
    cta: {
      title: str(settings.directionCtaTitle, d.directionCtaTitle),
      description: str(settings.directionCtaDescription, d.directionCtaDescription),
      primaryLabel: str(settings.directionCtaPrimaryLabel, d.directionCtaPrimaryLabel),
      primaryHref: str(settings.directionCtaPrimaryHref, d.directionCtaPrimaryHref),
      secondaryLabel: str(
        settings.directionCtaSecondaryLabel,
        d.directionCtaSecondaryLabel,
      ),
      secondaryHref: str(
        settings.directionCtaSecondaryHref,
        d.directionCtaSecondaryHref,
      ),
    },
  };
}

export type ResolvedDirectionContent = ReturnType<typeof resolveDirectionContent>;
