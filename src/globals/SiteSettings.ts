import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true },
  fields: [
    { name: 'companyName', type: 'text', localized: true },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'founded', type: 'number' },
    {
      name: 'offices',
      type: 'array',
      fields: [
        { name: 'city', type: 'text', localized: true },
        { name: 'country', type: 'text', localized: true },
        { name: 'address', type: 'text' },
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'text' },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'linkedin', type: 'text' },
        { name: 'github', type: 'text' },
        { name: 'email', type: 'text' },
      ],
    },
  ],
}
