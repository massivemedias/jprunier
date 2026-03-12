import type { CollectionConfig } from 'payload'

export const NewsArticles: CollectionConfig = {
  slug: 'news-articles',
  labels: { singular: 'Article', plural: 'Actualités' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'category', 'status'],
    group: 'Contenu',
    description: 'Articles et nouvelles affichés sur la page Actualités',
    listSearchableFields: ['title', 'excerpt'],
    preview: (doc: any) => {
      return `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jprunier.com'}/news`
    },
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true, admin: { description: 'Titre de l\'article' } },
    {
      type: 'row',
      fields: [
        {
          name: 'status',
          type: 'select',
          defaultValue: 'published',
          options: [
            { label: '📝 Brouillon', value: 'draft' },
            { label: '✅ Publié', value: 'published' },
            { label: '📌 Épinglé', value: 'featured' },
          ],
          admin: { width: '25%', description: 'Statut de publication' },
        },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: '📰 Actualité', value: 'news' },
            { label: '🏆 Projet', value: 'project' },
            { label: '🤝 Partenariat', value: 'partnership' },
            { label: '💡 Innovation', value: 'innovation' },
            { label: '📅 Événement', value: 'event' },
          ],
          admin: { width: '25%', description: 'Catégorie de l\'article' },
        },
        { name: 'date', type: 'date', required: true, admin: { width: '25%', date: { displayFormat: 'dd/MM/yyyy' }, description: 'Date de publication' } },
        { name: 'linkedinUrl', type: 'text', admin: { width: '25%', description: 'Lien vers le post LinkedIn' } },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Image de couverture de l\'article' } },
    { name: 'excerpt', type: 'textarea', required: true, localized: true, admin: { description: 'Résumé court affiché sur la carte (2-3 lignes)' } },
    {
      name: 'body',
      type: 'richText',
      localized: true,
      admin: { description: 'Contenu complet de l\'article (optionnel — si vide, le lien LinkedIn sera utilisé)' },
    },
    {
      name: 'tags',
      type: 'array',
      labels: { singular: 'Tag', plural: 'Tags' },
      admin: { description: 'Mots-clés pour le filtrage' },
      fields: [
        { name: 'tag', type: 'text', required: true },
      ],
    },
  ],
}
