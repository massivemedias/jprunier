import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  access: { read: () => true },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
      ],
    },
    { name: 'intro', type: 'textarea', localized: true },
    { name: 'mission', type: 'textarea', localized: true },
    { name: 'vision', type: 'textarea', localized: true },
    {
      name: 'values',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
}
