# LA DECADES — Site institutionnel

Site web de la direction **LA DECADES**, réseau d'écoles chrétiennes au Sénégal.

## Stack

- **Next.js 16** — site public
- **Sanity** — gestion du contenu (écoles, actualités, paramètres)
- **Tailwind CSS** — charte visuelle (orange `#D95F23`, crème, noir)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Accueil |
| `/direction` | Présentation de la direction |
| `/ecoles` | Liste des écoles par ville |
| `/ecoles/[slug]` | Fiche école |
| `/actualites` | Articles, annonces, événements, partenariats |
| `/actualites/[slug]` | Détail d'une publication |
| `/contact` | Contact et formulaire |
| `/studio` | Administration Sanity |

## Démarrage rapide

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

Sans configuration Sanity, le site affiche des **données de démonstration**.

## Configurer Sanity

**Guide détaillé (recommandé) :** voir [`SETUP-SANITY.md`](./SETUP-SANITY.md)

Résumé :

```bash
cp .env.local.example .env.local
# Éditez .env.local avec votre Project ID depuis sanity.io/manage

npx sanity login --provider google   # ou github / sanity
npm run check:sanity                 # vérifie .env.local
npm run dev
```

Puis ouvrez `/studio` et créez :
   - **Paramètres du site** (1 document)
   - **Écoles**
   - **Actualités**

## Scripts

| Commande | Action |
|----------|--------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm run start` | Serveur production |

## Déploiement

Recommandé : [Vercel](https://vercel.com) avec les variables d'environnement Sanity.

## Logo

Le fichier `public/logo.png` est utilisé dans l'en-tête et le pied de page.
