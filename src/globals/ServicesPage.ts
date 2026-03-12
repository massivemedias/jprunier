import type { GlobalConfig } from 'payload'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  label: 'Page Services',
  admin: {
    group: 'Pages',
    description: 'Contenu de la page liste des services : hero, intro, Crestron, expertise',
    preview: () => `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jprunier.com'}/services`,
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '🎯 Hero & Introduction',
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
            { name: 'intro', type: 'textarea', localized: true, admin: { description: 'Texte d\'introduction sous le hero' } },
          ],
        },
        {
          label: '🏗️ Crestron',
          description: 'Partenariat Crestron',
          fields: [
            {
              name: 'crestronSection',
              type: 'group',
              label: 'Section Crestron',
              admin: { description: 'Mise en avant du partenariat Crestron' },
              fields: [
                { name: 'title', type: 'text', localized: true, admin: { description: 'Titre de la section' } },
                { name: 'description', type: 'textarea', localized: true, admin: { description: 'Description du partenariat' } },
                { name: 'logo', type: 'upload', relationTo: 'media', admin: { description: 'Logo Crestron' } },
                { name: 'capabilities', type: 'array', labels: { singular: 'Capacité', plural: 'Capacités' }, admin: { description: 'Liste des capacités Crestron' }, fields: [{ name: 'text', type: 'text', localized: true }] },
              ],
            },
          ],
        },
        {
          label: '🧠 Expertise',
          description: 'Catégories d\'expertise technique',
          fields: [
            {
              name: 'expertise',
              type: 'group',
              label: 'Section Expertise',
              admin: { description: 'Catégories d\'expertise technique' },
              fields: [
                { name: 'title', type: 'text', localized: true, admin: { description: 'Titre de la section' } },
                {
                  name: 'categories',
                  type: 'array',
                  labels: { singular: 'Catégorie', plural: 'Catégories' },
                  admin: { description: 'Grille des catégories techniques' },
                  fields: [
                    { name: 'name', type: 'text', localized: true, admin: { description: 'Nom de la catégorie (ex: AV, Réseau, IA)' } },
                    { name: 'items', type: 'array', labels: { singular: 'Élément', plural: 'Éléments' }, fields: [{ name: 'text', type: 'text' }] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
