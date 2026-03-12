import type { GlobalConfig } from 'payload'

export const NewsPage: GlobalConfig = {
  slug: 'news-page',
  label: 'Page Actualités',
  admin: {
    group: 'Pages',
    description: 'Contenu de la page Actualités : hero et configuration',
    preview: () => `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jprunier.com'}/news`,
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
      name: 'settings',
      type: 'group',
      label: 'Paramètres',
      admin: { description: 'Configuration de l\'affichage des articles' },
      fields: [
        { name: 'articlesPerPage', type: 'number', defaultValue: 9, admin: { description: 'Nombre d\'articles par page' } },
        { name: 'showCategories', type: 'checkbox', defaultValue: true, admin: { description: 'Afficher les filtres par catégorie' } },
      ],
    },
  ],
}
