import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [
    { name: 'alt', type: 'text', required: true, localized: true },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Interface Screenshot', value: 'interface' },
        { label: 'Certification Badge', value: 'certification' },
        { label: 'Client Logo', value: 'client' },
        { label: 'Background', value: 'background' },
        { label: 'Photo', value: 'photo' },
        { label: 'Tech Partner Logo', value: 'partner' },
        { label: 'Brochure (PDF)', value: 'brochure' },
        { label: 'Other', value: 'other' },
      ],
      admin: { description: 'Category for organizing media in the admin panel' },
    },
  ],
}
