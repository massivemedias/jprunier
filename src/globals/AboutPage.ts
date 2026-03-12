import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'Page À propos',
  admin: {
    group: 'Pages',
    description: 'Contenu de la page À propos : mission, vision et valeurs',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Section Hero',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
      ],
    },
    { name: 'intro', type: 'textarea', localized: true, admin: { description: 'Texte d\'introduction "Qui sommes-nous"' } },
    { name: 'mission', type: 'textarea', localized: true, admin: { description: 'Notre mission' } },
    { name: 'vision', type: 'textarea', localized: true, admin: { description: 'Notre vision' } },
    {
      name: 'values',
      type: 'array',
      labels: { singular: 'Valeur', plural: 'Nos valeurs' },
      admin: { description: 'Grille de valeurs d\'entreprise' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
}
