import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Témoignage', plural: 'Témoignages' },
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'company', 'title'],
    group: 'Contenu',
    description: 'Témoignages clients affichés sur la page d\'accueil',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'author', type: 'text', required: true, admin: { width: '40%', description: 'Nom complet' } },
        { name: 'company', type: 'text', required: true, admin: { width: '30%' } },
        { name: 'title', type: 'text', required: true, localized: true, admin: { width: '30%', description: 'Poste occupé' } },
      ],
    },
    { name: 'text', type: 'textarea', required: true, localized: true, admin: { description: 'Texte du témoignage' } },
    { name: 'avatar', type: 'upload', relationTo: 'media', admin: { description: 'Photo de profil (optionnel)' } },
  ],
}
