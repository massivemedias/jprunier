import type { CollectionConfig } from 'payload'

export const Sectors: CollectionConfig = {
  slug: 'sectors',
  labels: { singular: 'Secteur', plural: 'Secteurs' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'icon', 'sortOrder'],
    group: 'Contenu',
    description: 'Secteurs d\'activité (Corporate, Éducation, Santé, etc.)',
    listSearchableFields: ['name'],
  },
  access: { read: () => true },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, localized: true, admin: { width: '40%', description: 'Nom du secteur' } },
        {
          name: 'icon',
          type: 'select',
          admin: { width: '30%', description: 'Icône représentative' },
          options: [
            { label: '🏢 Corporate', value: 'building' },
            { label: '🎓 Éducation', value: 'graduation' },
            { label: '🏥 Santé', value: 'health' },
            { label: '🏨 Hôtellerie', value: 'hotel' },
            { label: '🏛️ Gouvernement', value: 'government' },
            { label: '🏗️ Immobilier', value: 'realestate' },
            { label: '🎭 Culture', value: 'culture' },
            { label: '🏭 Industrie', value: 'industry' },
          ],
        },
        { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { width: '30%', description: 'Ordre d\'affichage' } },
      ],
    },
    { name: 'description', type: 'textarea', localized: true, admin: { description: 'Brève description du secteur (optionnel)' } },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Image représentative du secteur (optionnel)' } },
  ],
}
