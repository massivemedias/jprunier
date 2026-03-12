import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Page Contact',
  admin: {
    group: 'Pages',
    description: 'Contenu de la page Contact : hero, formulaire et informations',
    preview: () => `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jprunier.com'}/contact`,
  },
  access: { read: () => true },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Section Hero',
      fields: [
        { name: 'title', type: 'text', localized: true, admin: { description: 'Titre principal' } },
        { name: 'subtitle', type: 'text', localized: true, admin: { description: 'Sous-titre' } },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media', admin: { description: 'Image de fond du hero' } },
      ],
    },
    {
      name: 'form',
      type: 'group',
      label: 'Formulaire',
      admin: { description: 'Configuration du formulaire de contact' },
      fields: [
        { name: 'title', type: 'text', localized: true, admin: { description: 'Titre au-dessus du formulaire' } },
        { name: 'successMessage', type: 'textarea', localized: true, admin: { description: 'Message affiché après envoi réussi' } },
      ],
    },
  ],
}
