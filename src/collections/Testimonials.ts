import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'author' },
  access: { read: () => true },
  fields: [
    { name: 'author', type: 'text', required: true },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'company', type: 'text', required: true },
    { name: 'text', type: 'textarea', required: true, localized: true },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
  ],
}
