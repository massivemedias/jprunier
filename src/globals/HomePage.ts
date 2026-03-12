import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: { read: () => true },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'textarea', localized: true },
      ],
    },
    { name: 'servicesIntro', type: 'textarea', localized: true },
    {
      name: 'gateway',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
      ],
    },
    {
      name: 'techPartners',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'logo', type: 'text' },
      ],
    },
    {
      name: 'connectingItems',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'icon', type: 'select', options: ['grid', 'link', 'chat'] },
      ],
    },
    {
      name: 'expertiseItems',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'discoverCta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'textarea', localized: true },
        { name: 'button', type: 'text', localized: true },
      ],
    },
    {
      name: 'achievements',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
      ],
    },
    {
      name: 'ctaSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'textarea', localized: true },
        { name: 'button', type: 'text', localized: true },
      ],
    },
  ],
}
