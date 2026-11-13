# Site vitrine — Agence de location de voitures (Lomé, Togo)

Site statique en **HTML5 / CSS3 / Bootstrap 5 / JavaScript vanilla**, sans dépendance de build.

## Structure

```text
location-voiture/
├── index.html               Accueil (hero, recherche, flotte, services, tarifs, avis, FAQ)
├── vehicules.html            Flotte complète avec filtres par catégorie
├── vehicule-details.html     Fiche détaillée d'un véhicule (?id=1, ?id=2, ...)
├── reservation.html          Formulaire de réservation en 3 étapes + calcul du prix
├── contact.html              Formulaire de contact validé
├── css/
│   └── style.css             Feuille de style unique (design tokens, composants, responsive)
├── js/
│   ├── main.js                Config agence (AGENCY_CONFIG), navbar, compteurs, lightbox, formulaire contact
│   ├── vehicles.js            Données des véhicules (VEHICLES) + rendu des cartes + modal détails
│   └── reservation.js         Logique du tunnel de réservation (étapes, calcul, WhatsApp)
├── images/                    Dossier prévu pour vos propres photos (voir plus bas)
└── README.md
```

## Personnalisation rapide

### 1. Coordonnées de l'agence
Tout se passe dans `js/main.js`, en haut du fichier, dans l'objet `AGENCY_CONFIG` :

```js
const AGENCY_CONFIG = {
  name: "[NOM DE L'AGENCE]",
  phone: "+228 XX XX XX XX",
  phoneHref: "tel:+228XXXXXXXX",
  whatsappNumber: "228XXXXXXXX",   // sans le "+"
  email: "[EMAIL]",
  address: "[ADRESSE], Lomé, Togo",
  mapsEmbedUrl: "...",             // lien d'intégration Google Maps
  ...
};
```
Ces valeurs se répercutent automatiquement partout sur le site (navbar, footer, section localisation, liens WhatsApp).

### 2. Véhicules
Tout se passe dans `js/vehicles.js`, dans le tableau `VEHICLES`. Chaque véhicule est un objet indépendant :

```js
{
  id: 1,
  name: "Toyota Corolla",
  category: "Berline",       // Économique | Berline | SUV | Premium | Familiale
  priceDay: 35000,
  priceWeek: 210000,
  transmission: "Automatique",
  seats: 5,
  fuel: "Essence",
  airConditioning: true,
  luggage: 2,
  year: 2022,
  popular: true,
  available: true,
  description: "...",
  conditions: "...",
  image: "chemin/vers/image-principale.jpg",
  gallery: ["image1.jpg", "image2.jpg", "image3.jpg"]
}
```
Pour ajouter un véhicule, copiez un bloc existant et changez l'`id` (unique). Pour le retirer, supprimez son bloc.

### 3. Remplacer les images par les vraies photos de l'agence
Les images utilisées actuellement proviennent d'Unsplash (libres de droits) et servent de démonstration réaliste.
Pour les remplacer :
1. Déposez vos photos dans `images/vehicles/`, `images/hero/`, `images/gallery/`.
2. Remplacez les URL Unsplash dans `js/vehicles.js` (`image`, `gallery`) et dans les fichiers HTML (hero, galerie, sections services) par vos chemins locaux, ex. `images/vehicles/toyota-corolla.jpg`.

### 4. Tarifs (section "Tarification" de l'accueil)
Modifiables directement dans `index.html` (section `#tarifs`) — ce sont des montants indicatifs, distincts du prix par véhicule (qui vient de `vehicles.js`).

### 5. Google Maps
Remplacez `mapsEmbedUrl` dans `AGENCY_CONFIG` par le lien d'intégration (`https://www.google.com/maps?q=LAT,LNG&z=15&output=embed`) correspondant à la vraie adresse de l'agence.

## Fonctionnalités clés

- **Recherche/réservation** en hero, filtres par catégorie sur `vehicules.html`.
- **Modal détails véhicule** (sur l'accueil et la page flotte) + **page dédiée** `vehicule-details.html?id=X`.
- **Tunnel de réservation en 3 étapes** avec calcul automatique du prix (jours × tarif/jour) et résumé en temps réel.
- **Génération automatique du message WhatsApp** de réservation (véhicule, dates, durée, montant estimé, coordonnées).
- **Bouton WhatsApp flottant** permanent avec message par défaut configurable.
- **Formulaire de contact** avec validation JavaScript et messages d'erreur explicites.
- **Compteurs animés, apparitions au scroll, hover cartes** — respectent `prefers-reduced-motion`.
- **Entièrement responsive** de 375px à 1920px, menu hamburger sur mobile.

## Prérequis techniques

Aucun serveur ni build nécessaire : ouvrez `index.html` dans un navigateur, ou déployez le dossier tel quel sur n'importe quel hébergement statique (Netlify, GitHub Pages, cPanel, etc.).
