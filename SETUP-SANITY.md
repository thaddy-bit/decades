# Guide — Connecter Sanity à LA DECADES

Suivez ces étapes dans l’ordre. Durée estimée : **10 à 15 minutes**.

---

## Étape 1 — Créer un compte Sanity

1. Ouvrez **[https://www.sanity.io](https://www.sanity.io)**  
2. Cliquez sur **Get started** / **S’inscrire**  
3. Utilisez Google, GitHub ou e-mail  

---

## Étape 2 — Créer le projet « LA DECADES »

1. Allez sur **[https://www.sanity.io/manage](https://www.sanity.io/manage)**  
2. Cliquez **Create project**  
3. Nom du projet : **`LA DECADES`**  
4. Choisissez le plan **Free**  
5. Dataset : gardez **`production`** (recommandé)  
6. Notez le **Project ID** (ex. `a1b2c3d4`) — vous en aurez besoin à l’étape 4  

---

## Étape 3 — Autoriser votre site (CORS)

Sans cette étape, le studio ne pourra pas se connecter depuis votre ordinateur.

1. Dans [sanity.io/manage](https://www.sanity.io/manage), ouvrez le projet **LA DECADES**  
2. Menu **API** → **CORS origins**  
3. Cliquez **Add CORS origin**  
4. Ajoutez ces deux URLs (une par une) :

   | Origin | Allow credentials |
   |--------|-------------------|
   | `http://localhost:3000` | Oui ✓ |
   | `http://localhost:3333` | Oui ✓ |

5. Enregistrez  

*(Plus tard, ajoutez aussi `https://votre-domaine.sn` quand le site sera en ligne.)*

---

## Étape 4 — Fichier `.env.local`

Dans le dossier du projet (`decades`), créez le fichier **`.env.local`** :

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=collez_ici_votre_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-05-22
```

Remplacez `collez_ici_votre_project_id` par l’ID de l’étape 2.

**Exemple :**

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=7x8y9z0a
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-05-22
```

---

## Étape 5 — Connexion CLI (terminal)

Dans le terminal, à la racine du projet :

```bash
cd /Users/mac/Desktop/decades
npx sanity login
```

Une page navigateur s’ouvre → connectez-vous avec le **même compte** que sur sanity.io.

---

## Étape 6 — Lier le CLI au projet

Toujours dans le terminal :

```bash
npx sanity init -y --env .env.local --project VOTRE_PROJECT_ID --dataset production
```

Remplacez `VOTRE_PROJECT_ID` par votre ID réel.

Si le CLI demande d’écraser des fichiers, répondez **non** (le schéma est déjà dans ce repo).

---

## Étape 7 — Redémarrer le site

```bash
npm run dev
```

Ouvrez :

- Site : **http://localhost:3000**  
- Studio : **http://localhost:3000/studio**  

Connectez-vous au studio avec votre compte Sanity.

---

## Étape 8 — Premier contenu dans le studio

Créez dans cet ordre :

### 1. Slides accueil (carrousel)

Créez autant de slides que nécessaire (3 à 5 recommandé) :

| Champ | Exemple |
|-------|---------|
| Titre principal | `LA DECADES` |
| Sur-titre | `Direction d'écoles chrétiennes` |
| Description | Texte d'accroche (2–3 lignes) |
| Image de fond | Photo paysage 1920×1080 |
| Bouton principal | `Découvrir nos écoles` → `/ecoles` |
| Bouton secondaire | `La Direction` → `/direction` |
| Ordre | `1`, `2`, `3`… |
| Afficher | ✓ coché |

**Publiez** chaque slide. Tant qu'aucun slide n'est publié, le carrousel automatique (écoles / actualités) reste actif.

### 2. Contenu des pages (1 document partagé, onglets dans le Studio)

Dans le menu gauche du Studio (`/studio`), ouvrez par exemple **Page — La Direction** (ou **Général** pour le nom officiel).  
C’est **le même document** : utilisez les **onglets en haut du formulaire** pour naviguer.

**Onglet « Page — La Direction »** (sections repliables dans le formulaire)

| Section Sanity | Contenu modifiable sur `/direction` |
|----------------|-------------------------------------|
| **Bannière (hero)** | Sur-titre, titre, texte sous le titre, image de fond |
| **Section Histoire** | Titres, intro, texte riche, photo, année, signification DECADES |
| **Mission & Vision** | Libellés, titres et textes des deux cartes |
| **Bloc identité** | Titre, description, citation, bouton |
| **Section Valeurs** | Titres, description, liste de valeurs (tags) |
| **Présentation détaillée** | Bloc rich text en bas de page |
| **Appel à action** | Titre, texte et liens des boutons du bas |

**Onglet « Général »**

| Champ | Usage |
|-------|--------|
| **Nom complet officiel** | Référence ; utilisé en secours si le texte hero est vide |
| Slogan | Pied de page |

Autres onglets : **Nos Écoles**, **Actualités**, **Contact** (bannières + intros + coordonnées).

> **Important :** après modification, cliquez **Publish**. Le site met jusqu’à ~2 minutes à rafraîchir le cache.

### 3. Écoles

Pour chaque établissement :

- Nom, slug (généré automatiquement), ville  
- Adresse, téléphone, e-mail  
- Niveaux (tags)  
- Photo (optionnel)  
- Cochez **Mettre en avant** pour l’accueil  

### 4. Actualités

- Titre, type (article, annonce, événement…)  
- Résumé, contenu  
- Image et/ou **lien YouTube**  
- Date de publication  

Publiez chaque document (bouton **Publish**).

---

## Vérification

| Test | Résultat attendu |
|------|------------------|
| Accueil sans données démo | Vos écoles « en avant » s’affichent |
| `/ecoles` | Liste de vos vraies écoles |
| `/actualites` | Vos publications |
| Modifier un titre dans le studio | Visible après rafraîchissement du site |

---

## Problèmes fréquents

**« Configuration must contain projectId »**  
→ `.env.local` manquant ou `NEXT_PUBLIC_SANITY_PROJECT_ID` vide. Redémarrez `npm run dev`.

**Studio blanc ou erreur CORS**  
→ Vérifiez l’étape 3 (`http://localhost:3000` avec credentials).

**Le site affiche encore les écoles de démo**  
→ Le `PROJECT_ID` n’est pas lu : vérifiez le nom du fichier (`.env.local`) et redémarrez le serveur.

**Besoin d’aide**  
→ Documentation : [https://www.sanity.io/docs](https://www.sanity.io/docs)
