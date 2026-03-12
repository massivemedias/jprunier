import type { CollectionConfig } from 'payload'

export const Sectors: CollectionConfig = {
  slug: 'sectors',
  labels: { singular: 'Secteur', plural: 'Secteurs' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sortOrder'],
    group: 'Contenu',
    description: 'Secteurs d\'activité (Corporate, Éducation, Santé, etc.)',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, localized: true, admin: { width: '70%' } },
        { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { width: '30%', description: 'Ordre d\'affichage' } },
      ],
    },
  ],
}
