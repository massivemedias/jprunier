import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'Page À propos',
  admin: {
    group: 'Pages',
    description: 'Contenu de la page À propos : mission, vision et valeurs',
    preview: () => `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jprunier.com'}/about`,
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '🎯 Hero & Introduction',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Section Hero',
              fields: [
                { name: 'title', type: 'text', localized: true, admin: { description: 'Titre principal de la page' } },
                { name: 'subtitle', type: 'text', localized: true, admin: { description: 'Sous-titre descriptif' } },
                { name: 'backgroundImage', type: 'upload', relationTo: 'media', admin: { description: 'Image de fond du hero' } },
              ],
            },
            { name: 'intro', type: 'textarea', localized: true, admin: { description: 'Texte d\'introduction "Qui sommes-nous"' } },
          ],
        },
        {
          label: '🚀 Mission & Vision',
          fields: [
            { name: 'mission', type: 'textarea', localized: true, admin: { description: 'Notre mission — Pourquoi JPrunier existe' } },
            { name: 'vision', type: 'textarea', localized: true, admin: { description: 'Notre vision — Où nous allons' } },
          ],
        },
        {
          label: '💎 Valeurs',
          fields: [
            {
              name: 'values',
              type: 'array',
              labels: { singular: 'Valeur', plural: 'Nos valeurs' },
              admin: { description: 'Grille de valeurs d\'entreprise affichées sur la page' },
              fields: [
                { name: 'title', type: 'text', localized: true, admin: { description: 'Nom de la valeur' } },
                { name: 'description', type: 'textarea', localized: true, admin: { description: 'Explication de cette valeur' } },
                {
                  name: 'icon',
                  type: 'select',
                  options: [
                    { label: '💡 Innovation', value: 'lightbulb' },
                    { label: '🤝 Collaboration', value: 'handshake' },
                    { label: '🎯 Excellence', value: 'target' },
                    { label: '🔒 Fiabilité', value: 'shield' },
                    { label: '⚡ Agilité', value: 'zap' },
                    { label: '🌍 Durabilité', value: 'globe' },
                  ],
                  admin: { description: 'Icône de la valeur' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
