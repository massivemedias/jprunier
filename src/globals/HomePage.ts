import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Page d\'accueil',
  admin: {
    group: 'Pages',
    description: 'Contenu de la page d\'accueil : hero, services, partenaires, expertise',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Section Hero',
      admin: { description: 'Bannière principale en haut de la page' },
      fields: [
        { name: 'title', type: 'text', localized: true, admin: { description: 'Titre principal' } },
        { name: 'subtitle', type: 'textarea', localized: true, admin: { description: 'Sous-titre descriptif' } },
      ],
    },
    { name: 'servicesIntro', type: 'textarea', localized: true, admin: { description: 'Texte d\'introduction de la section services' } },
    {
      name: 'gateway',
      type: 'group',
      label: 'Section Gateway',
      admin: { description: 'Section "Votre passerelle vers..."' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
      ],
    },
    {
      name: 'techPartners',
      type: 'array',
      labels: { singular: 'Partenaire', plural: 'Partenaires tech' },
      admin: { description: 'Logos des partenaires technologiques' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'logo', type: 'text', admin: { description: 'Chemin du logo SVG' } },
      ],
    },
    {
      name: 'connectingItems',
      type: 'array',
      labels: { singular: 'Élément', plural: 'Connecting Spaces' },
      admin: { description: 'Section "Connecting spaces" avec icônes' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'icon', type: 'select', options: ['grid', 'link', 'chat'] },
      ],
    },
    {
      name: 'expertiseItems',
      type: 'array',
      labels: { singular: 'Expertise', plural: 'Expertises' },
      admin: { description: 'Grille d\'expertises sur la page d\'accueil' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'discoverCta',
      type: 'group',
      label: 'CTA Découvrir',
      admin: { description: 'Bouton d\'appel à l\'action "Découvrir nos services"' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'textarea', localized: true },
        { name: 'button', type: 'text', localized: true },
      ],
    },
    {
      name: 'achievements',
      type: 'group',
      label: 'Réalisations',
      admin: { description: 'Section compteurs (projets, clients, etc.)' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
      ],
    },
    {
      name: 'ctaSection',
      type: 'group',
      label: 'CTA Final',
      admin: { description: 'Section d\'appel à l\'action en bas de page' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'textarea', localized: true },
        { name: 'button', type: 'text', localized: true },
      ],
    },
  ],
}
