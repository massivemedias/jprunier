# JPrunier Inc. - AI-AV Integration

> Site vitrine moderne pour JPrunier Inc., specialiste en integration audiovisuelle et intelligence artificielle.

**[Voir le site en ligne](https://massivemedias.github.io/jprunier/)**

---

## Stack technique

| Technologie | Version | Role |
|---|---|---|
| **Vite** | 7.3.1 | Build tool et dev server |
| **React** | 19.2.0 | Framework UI |
| **React Router DOM** | 6.30.3 | Navigation SPA (HashRouter) |
| **Framer Motion** | 12.35.2 | Animations et transitions |
| **Lucide React** | 0.577.0 | Icones SVG |
| **CSS Variables** | - | Design system (pas de Tailwind) |

## Architecture

```
src/
  components/          # Composants reutilisables
    Header.jsx/.css    # Navigation sticky, dropdown Services, toggle FR/EN
    Hero.jsx/.css      # Section hero reutilisable avec animations staggered
    Footer.jsx/.css    # Footer avec CTA conditionnel
    ScrollToTop.jsx    # Scroll reset sur changement de route

  pages/               # Pages completes
    Home.jsx/.css      # 11 sections (hero, gateway, partners, services, accordion...)
    About.jsx/.css     # Presentation, mission, valeurs, temoignages
    Services.jsx/.css  # Detail des 4 services, expertise Crestron
    Contact.jsx/.css   # Formulaire + coordonnees bureaux (Montreal/Paris)
    News.jsx/.css      # Articles + newsletter

  context/
    LanguageContext.jsx # Systeme i18n maison (React Context + localStorage)

  data/                # Contenu editable (pas dans le code)
    content.json       # Contenu principal EN
    content-fr.json    # Contenu principal FR
    testimonials.json  # Temoignages EN
    testimonials-fr.json
    news.json          # Articles EN
    news-fr.json
    ui-strings.js      # ~50 chaines UI traduites (labels, boutons, titres)

  styles/
    global.css         # Variables CSS, reset, classes utilitaires
```

## Design system

Le site utilise un systeme de variables CSS defini dans `global.css` :

- **Couleurs** : fond sombre `#0a1520`, primaire `#102136`, accent violet `#7456f1`
- **Sections alternees** : dark (`.section`) / light (`.section-light`) avec fond blanc
- **Glassmorphism** : `backdrop-filter: blur()` + bordures semi-transparentes sur les cartes
- **Typographie** : system font stack, tailles en `rem` via variables

## Bilingue FR/EN

Le systeme i18n est fait maison sans librairie externe :

1. **`LanguageContext`** fournit `useLanguage()`, `useContent()`, `useT()`
2. **Contenu** : fichiers JSON doubles (EN/FR) charges selon la langue active
3. **UI strings** : objet `{ en: {...}, fr: {...} }` pour les chaines hardcodees
4. **Persistance** : `localStorage` avec cle `jprunier-lang`
5. **Toggle** : boutons FR / EN dans le header

## Deploiement

Le site est deploye automatiquement sur **GitHub Pages** via GitHub Actions.

- Chaque push sur `main` declenche le workflow `.github/workflows/deploy.yml`
- Vite build avec `base: '/jprunier/'`
- Deploiement vers `github-pages` environment

### Developper en local

```bash
npm install
npm run dev        # http://localhost:5173
```

### Build production

```bash
npm run build      # Genere dist/
npm run preview    # Preview du build
```

## Pages

| Page | Route | Description |
|---|---|---|
| Accueil | `/` | Hero anime, gateway Crestron, logos partenaires, services, accordion, expertise, secteurs, CTA |
| A propos | `/about` | Intro, mission, vision, valeurs, temoignages clients |
| Services | `/services` | 4 services detailles (Programmation, Conseil, Administration, Integration), expertise Crestron |
| Contact | `/contact` | Formulaire, bureaux Montreal + Paris, carte |
| Nouvelles | `/news` | Articles, newsletter |

## Credits

Construit par [massivemedias](https://github.com/massivemedias) pour JPrunier Inc.
