import type { GlobalConfig } from 'payload'

export const NewsPage: GlobalConfig = {
  slug: 'news-page',
  label: 'Page Actualités',
  admin: {
    group: 'Pages',
    description: 'Contenu de la page Actualités : titre et sous-titre',
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
  ],
}
