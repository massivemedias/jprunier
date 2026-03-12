import type { GlobalConfig } from 'payload'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  label: 'Page Services',
  admin: {
    group: 'Pages',
    description: 'Contenu de la page liste des services : hero, intro, Crestron, expertise',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Section Hero',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
      ],
    },
    { name: 'intro', type: 'textarea', localized: true, admin: { description: 'Texte d\'introduction sous le hero' } },
    {
      name: 'crestronSection',
      type: 'group',
      label: 'Section Crestron',
      admin: { description: 'Mise en avant du partenariat Crestron' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'capabilities', type: 'array', labels: { singular: 'Capacité', plural: 'Capacités' }, fields: [{ name: 'text', type: 'text', localized: true }] },
      ],
    },
    {
      name: 'expertise',
      type: 'group',
      label: 'Section Expertise',
      admin: { description: 'Catégories d\'expertise technique' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        {
          name: 'categories',
          type: 'array',
          labels: { singular: 'Catégorie', plural: 'Catégories' },
          fields: [
            { name: 'name', type: 'text', localized: true },
            { name: 'items', type: 'array', labels: { singular: 'Élément', plural: 'Éléments' }, fields: [{ name: 'text', type: 'text' }] },
          ],
        },
      ],
    },
  ],
}
