import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Page Contact',
  admin: {
    group: 'Pages',
    description: 'Contenu de la page Contact : titre et sous-titre',
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
