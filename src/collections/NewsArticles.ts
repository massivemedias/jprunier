import type { CollectionConfig } from 'payload'

export const NewsArticles: CollectionConfig = {
  slug: 'news-articles',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'date'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'excerpt', type: 'textarea', required: true, localized: true },
    { name: 'date', type: 'date', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'linkedinUrl', type: 'text' },
  ],
}
