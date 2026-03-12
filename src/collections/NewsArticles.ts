import type { CollectionConfig } from 'payload'

export const NewsArticles: CollectionConfig = {
  slug: 'news-articles',
  labels: { singular: 'Article', plural: 'Actualités' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'linkedinUrl'],
    group: 'Contenu',
    description: 'Articles et nouvelles affichés sur la page Actualités',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'excerpt', type: 'textarea', required: true, localized: true, admin: { description: 'Résumé court affiché sur la carte' } },
    {
      type: 'row',
      fields: [
        { name: 'date', type: 'date', required: true, admin: { width: '30%', date: { displayFormat: 'dd/MM/yyyy' } } },
        { name: 'image', type: 'text', admin: { width: '40%', description: 'Chemin image (ex: /images/bg-bubbles.png)' } },
        { name: 'linkedinUrl', type: 'text', admin: { width: '30%', description: 'Lien LinkedIn' } },
      ],
    },
  ],
}
