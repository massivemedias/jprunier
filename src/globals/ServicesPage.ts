import type { GlobalConfig } from 'payload'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
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
    {
      name: 'crestronSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        {
          name: 'capabilities',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
      ],
    },
    {
      name: 'expertise',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        {
          name: 'categories',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', localized: true },
            { name: 'items', type: 'array', fields: [{ name: 'text', type: 'text' }] },
          ],
        },
      ],
    },
  ],
}
