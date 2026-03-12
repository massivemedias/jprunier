import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Paramètres du site',
  admin: {
    group: 'Configuration',
    description: 'Informations générales de l\'entreprise, bureaux et réseaux sociaux',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'companyName', type: 'text', localized: true, admin: { width: '50%', description: 'Nom de l\'entreprise' } },
        { name: 'founded', type: 'number', admin: { width: '20%', description: 'Année de fondation' } },
      ],
    },
    { name: 'tagline', type: 'text', localized: true, admin: { description: 'Slogan principal' } },
    { name: 'description', type: 'textarea', localized: true, admin: { description: 'Description SEO du site' } },
    {
      name: 'offices',
      type: 'array',
      labels: { singular: 'Bureau', plural: 'Bureaux' },
      admin: { description: 'Adresses des bureaux (Montréal, Paris, etc.)' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'city', type: 'text', localized: true, admin: { width: '40%' } },
            { name: 'country', type: 'text', localized: true, admin: { width: '30%' } },
            { name: 'phone', type: 'text', admin: { width: '30%' } },
          ],
        },
        { name: 'address', type: 'text' },
        { name: 'email', type: 'text' },
      ],
    },
    {
      name: 'social',
      type: 'group',
      label: 'Réseaux sociaux',
      admin: { description: 'Liens vers les profils sociaux' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'linkedin', type: 'text', admin: { width: '40%', description: 'URL LinkedIn' } },
            { name: 'github', type: 'text', admin: { width: '30%', description: 'URL GitHub' } },
            { name: 'email', type: 'text', admin: { width: '30%', description: 'Email de contact' } },
          ],
        },
      ],
    },
  ],
}
