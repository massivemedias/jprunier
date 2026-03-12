import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Témoignage', plural: 'Témoignages' },
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'company', 'rating', 'featured'],
    group: 'Contenu',
    description: 'Témoignages clients affichés sur la page d\'accueil',
    listSearchableFields: ['author', 'company', 'text'],
  },
  access: { read: () => true },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'author', type: 'text', required: true, admin: { width: '30%', description: 'Nom complet du client' } },
        { name: 'company', type: 'text', required: true, admin: { width: '25%', description: 'Entreprise' } },
        { name: 'title', type: 'text', required: true, localized: true, admin: { width: '25%', description: 'Poste occupé' } },
        {
          name: 'rating',
          type: 'select',
          defaultValue: '5',
          options: [
            { label: '⭐⭐⭐⭐⭐ 5/5', value: '5' },
            { label: '⭐⭐⭐⭐ 4/5', value: '4' },
            { label: '⭐⭐⭐ 3/5', value: '3' },
          ],
          admin: { width: '20%', description: 'Note' },
        },
      ],
    },
    { name: 'text', type: 'textarea', required: true, localized: true, admin: { description: 'Texte du témoignage' } },
    {
      type: 'row',
      fields: [
        { name: 'avatar', type: 'upload', relationTo: 'media', admin: { width: '50%', description: 'Photo de profil (optionnel)' } },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: { width: '50%', description: 'Mettre en avant sur la page d\'accueil' },
        },
      ],
    },
    { name: 'projectName', type: 'text', localized: true, admin: { description: 'Nom du projet associé (optionnel)' } },
  ],
}
