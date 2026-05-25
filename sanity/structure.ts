import type { StructureResolver } from "sanity/structure";

const SITE_SETTINGS_ID = "siteSettings";

function siteSettingsDoc(S: Parameters<StructureResolver>[0], title: string) {
  return S.document()
    .schemaType("siteSettings")
    .documentId(SITE_SETTINGS_ID)
    .title(title);
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("LA DECADES")
    .items([
      S.listItem()
        .title("Slides accueil (carrousel)")
        .schemaType("heroSlide")
        .child(
          S.documentTypeList("heroSlide")
            .title("Slides accueil")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.divider(),
      S.listItem()
        .title("Page — La Direction")
        .child(siteSettingsDoc(S, "Contenu · La Direction")),
      S.listItem()
        .title("Page — Nos Écoles")
        .child(siteSettingsDoc(S, "Contenu · Nos Écoles")),
      S.listItem()
        .title("Page — Actualités")
        .child(siteSettingsDoc(S, "Contenu · Actualités")),
      S.listItem()
        .title("Page — Contact")
        .child(siteSettingsDoc(S, "Contenu · Contact")),
      S.listItem()
        .title("Général (nom officiel, slogan…)")
        .child(siteSettingsDoc(S, "Paramètres généraux")),
      S.divider(),
      S.documentTypeListItem("school").title("Écoles"),
      S.documentTypeListItem("post").title("Actualités"),
    ]);
