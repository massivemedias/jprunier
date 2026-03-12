import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Page d\'accueil',
  admin: {
    group: 'Pages',
    description: 'Contenu de la page d\'accueil : hero, services, partenaires, expertise',
    preview: () => process.env.NEXT_PUBLIC_SITE_URL || 'https://jprunier.com',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '🏠 Hero & Intro',
          description: 'Bannière principale et introduction',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Section Hero',
              admin: { description: 'Bannière principale en haut de la page' },
              fields: [
                { name: 'title', type: 'text', localized: true, admin: { description: 'Titre principal' } },
                { name: 'subtitle', type: 'textarea', localized: true, admin: { description: 'Sous-titre descriptif' } },
                { name: 'backgroundImage', type: 'upload', relationTo: 'media', admin: { description: 'Image de fond du hero (optionnel)' } },
              ],
            },
            { name: 'servicesIntro', type: 'textarea', localized: true, admin: { description: 'Texte d\'introduction de la section services' } },
          ],
        },
        {
          label: '🤝 Partenaires',
          description: 'Logos des partenaires technologiques',
          fields: [
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
              admin: { description: 'Logos des partenaires technologiques affichés sur la page' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', required: true, admin: { width: '40%', description: 'Nom du partenaire' } },
                    { name: 'logo', type: 'text', admin: { width: '40%', description: 'Chemin du logo SVG (ex: /logos/crestron.svg)' } },
                    { name: 'url', type: 'text', admin: { width: '20%', description: 'Site web' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: '💡 Expertise',
          description: 'Sections expertise et connecting spaces',
          fields: [
            {
              name: 'connectingItems',
              type: 'array',
              labels: { singular: 'Élément', plural: 'Connecting Spaces' },
              admin: { description: 'Section "Connecting spaces" — les cartes accordion avec icônes' },
              fields: [
                { name: 'title', type: 'text', localized: true, admin: { description: 'Titre de la carte' } },
                { name: 'description', type: 'textarea', localized: true, admin: { description: 'Description détaillée' } },
                { name: 'icon', type: 'select', options: [
                  { label: '⊞ Grille', value: 'grid' },
                  { label: '🔗 Lien', value: 'link' },
                  { label: '💬 Chat', value: 'chat' },
                ], admin: { description: 'Icône de la carte' } },
              ],
            },
            {
              name: 'expertiseItems',
              type: 'array',
              labels: { singular: 'Expertise', plural: 'Expertises' },
              admin: { description: 'Grille d\'expertises technique' },
              fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'description', type: 'textarea', localized: true },
              ],
            },
          ],
        },
        {
          label: '📣 CTA & Stats',
          description: 'Appels à l\'action et statistiques',
          fields: [
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
        },
      ],
    },
  ],
}
