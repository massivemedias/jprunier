import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'icon', 'sortOrder'],
    group: 'Contenu',
    description: 'Pages de services (Intégration, Programmation, Consultation, Administration)',
    listSearchableFields: ['title', 'slug', 'description'],
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informations',
          description: 'Contenu principal du service',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'slug', type: 'text', required: true, unique: true, admin: { width: '30%', description: 'URL du service (ex: integration)' } },
                { name: 'title', type: 'text', required: true, localized: true, admin: { width: '50%' } },
                { name: 'icon', type: 'select', options: [
                  { label: '💻 Code', value: 'Code' },
                  { label: '💡 Lightbulb', value: 'Lightbulb' },
                  { label: '⚙️ Settings', value: 'Settings' },
                  { label: '⚡ Zap', value: 'Zap' },
                ], admin: { width: '20%' } },
              ],
            },
            { name: 'description', type: 'textarea', required: true, localized: true, admin: { description: 'Description courte affichée sur la carte du service' } },
            { name: 'pageTitle', type: 'text', localized: true, admin: { description: 'Titre affiché en haut de la page détail' } },
            { name: 'longDescription', type: 'textarea', localized: true, admin: { description: 'Description longue sur la page détail' } },
            {
              type: 'row',
              fields: [
                { name: 'heroImage', type: 'upload', relationTo: 'media', admin: { width: '70%', description: 'Image hero du service' } },
                { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { width: '30%', description: 'Ordre d\'affichage' } },
              ],
            },
          ],
        },
        {
          label: 'Points clés',
          description: 'Listes à puces et fonctionnalités',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'bulletsLeft', type: 'array', admin: { width: '50%', description: 'Colonne gauche' }, fields: [{ name: 'text', type: 'text', localized: true }] },
                { name: 'bulletsRight', type: 'array', admin: { width: '50%', description: 'Colonne droite' }, fields: [{ name: 'text', type: 'text', localized: true }] },
              ],
            },
            { name: 'features', type: 'array', labels: { singular: 'Fonctionnalité', plural: 'Fonctionnalités' }, admin: { description: 'Grille de fonctionnalités avec titre + description' }, fields: [
              { name: 'title', type: 'text', required: true, localized: true },
              { name: 'description', type: 'textarea', required: true, localized: true },
            ] },
            { name: 'technologies', type: 'array', labels: { singular: 'Technologie', plural: 'Technologies' }, fields: [{ name: 'name', type: 'text', required: true }] },
            { name: 'details', type: 'textarea', localized: true },
          ],
        },
        {
          label: 'Sections enrichies',
          description: 'Sections spéciales selon le service',
          fields: [
            { name: 'audiovisualSection', type: 'group', label: 'Section Audiovisuel', admin: { description: 'Section expertise audiovisuelle (programmation uniquement)' }, fields: [
              { name: 'title', type: 'text', localized: true },
              { name: 'description', type: 'textarea', localized: true },
              { name: 'domains', type: 'array', labels: { singular: 'Domaine', plural: 'Domaines' }, fields: [{ name: 'name', type: 'text', localized: true }] },
            ] },
            { name: 'extendedProgramming', type: 'group', label: 'Programmation étendue', admin: { description: 'Liste étendue des services de programmation' }, fields: [
              { name: 'title', type: 'text', localized: true },
              { name: 'items', type: 'array', fields: [{ name: 'text', type: 'text', localized: true }] },
              { name: 'languages', type: 'text', localized: true, admin: { description: 'Langages supportés' } },
            ] },
            { name: 'aiBridgeSection', type: 'group', label: 'Pont IA-IT', admin: { description: 'Intégration IA dans les systèmes IT' }, fields: [
              { name: 'title', type: 'text', localized: true },
              { name: 'tagline', type: 'text', localized: true },
              { name: 'description', type: 'textarea', localized: true },
              { name: 'capabilities', type: 'array', labels: { singular: 'Capacité', plural: 'Capacités' }, fields: [{ name: 'text', type: 'text', localized: true }] },
            ] },
          ],
        },
        {
          label: 'Galerie & Références',
          description: 'Interfaces, certifications et clients',
          fields: [
            { name: 'interfacesGallery', type: 'group', label: 'Galerie d\'interfaces', admin: { description: 'Captures d\'écran des interfaces tactiles' }, fields: [
              { name: 'title', type: 'text', localized: true },
              { name: 'subtitle', type: 'text', localized: true },
              { name: 'items', type: 'array', labels: { singular: 'Image', plural: 'Images' }, fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true, admin: { description: 'Capture d\'écran de l\'interface' } },
                { name: 'caption', type: 'text', localized: true },
              ] },
            ] },
            { name: 'certificationsSection', type: 'group', label: 'Certifications', admin: { description: 'Badges de certification' }, fields: [
              { name: 'title', type: 'text', localized: true },
              { name: 'subtitle', type: 'text', localized: true },
              { name: 'badges', type: 'array', labels: { singular: 'Badge', plural: 'Badges' }, fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true, admin: { description: 'Image du badge de certification' } },
                { name: 'name', type: 'text' },
                { name: 'issuer', type: 'text' },
              ] },
            ] },
            { name: 'referencesSection', type: 'group', label: 'Références clients', admin: { description: 'Logos et infos des clients' }, fields: [
              { name: 'title', type: 'text', localized: true },
              { name: 'subtitle', type: 'text', localized: true },
              { name: 'clients', type: 'array', labels: { singular: 'Client', plural: 'Clients' }, fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'logo', type: 'upload', relationTo: 'media', required: true, admin: { description: 'Logo du client' } },
                { name: 'period', type: 'text', admin: { description: 'Période (ex: 2018-2025)' } },
                { name: 'url', type: 'text', admin: { description: 'URL du site client' } },
              ] },
            ] },
          ],
        },
        {
          label: 'Garantie & Brochure',
          fields: [
            { name: 'warrantySection', type: 'group', label: 'Garantie qualité', admin: { description: 'Engagement qualité' }, fields: [
              { name: 'title', type: 'text', localized: true },
              { name: 'items', type: 'array', labels: { singular: 'Point', plural: 'Points' }, fields: [{ name: 'text', type: 'text', localized: true }] },
            ] },
            { name: 'brochureDownload', type: 'group', label: 'Téléchargement brochure', admin: { description: 'CTA téléchargement PDF' }, fields: [
              { name: 'title', type: 'text', localized: true },
              { name: 'description', type: 'text', localized: true },
              { name: 'buttonText', type: 'text', localized: true },
              { name: 'file', type: 'upload', relationTo: 'media', admin: { description: 'Fichier PDF de la brochure' } },
            ] },
          ],
        },
      ],
    },
  ],
}
