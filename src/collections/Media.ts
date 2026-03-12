import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Média', plural: 'Médias' },
  admin: {
    group: 'Configuration',
    description: 'Images, logos, certifications et documents PDF',
  },
  access: { read: () => true },
  upload: {
    staticDir: '../public/media',
    mimeTypes: ['image/*', 'application/pdf'],
    adminThumbnail: ({ doc }) => {
      if (doc?.filename) {
        return `/media/${doc.filename}`
      }
      return ''
    },
  },
  fields: [
    { name: 'alt', type: 'text', required: true, localized: true, admin: { description: 'Texte alternatif pour l\'accessibilité' } },
    {
      name: 'category',
      type: 'select',
      required: true,
      admin: { description: 'Catégorie pour organiser les médias' },
      options: [
        { label: 'Capture d\'interface', value: 'interface' },
        { label: 'Badge certification', value: 'certification' },
        { label: 'Logo client', value: 'client' },
        { label: 'Arrière-plan', value: 'background' },
        { label: 'Photo', value: 'photo' },
        { label: 'Logo partenaire', value: 'partner' },
        { label: 'Brochure PDF', value: 'brochure' },
        { label: 'Autre', value: 'other' },
      ],
    },
  ],
}
