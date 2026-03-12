import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'sortOrder'] },
  access: { read: () => true },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', required: true, localized: true },
    {
      name: 'icon',
      type: 'select',
      options: [
        { label: 'Code', value: 'Code' },
        { label: 'Lightbulb', value: 'Lightbulb' },
        { label: 'Settings', value: 'Settings' },
        { label: 'Zap', value: 'Zap' },
      ],
    },
    { name: 'pageTitle', type: 'text', localized: true },
    { name: 'longDescription', type: 'textarea', localized: true },
    {
      name: 'bulletsLeft',
      type: 'array',
      fields: [{ name: 'text', type: 'text', localized: true }],
    },
    {
      name: 'bulletsRight',
      type: 'array',
      fields: [{ name: 'text', type: 'text', localized: true }],
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'technologies',
      type: 'array',
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    { name: 'details', type: 'textarea', localized: true },
    {
      name: 'heroImage',
      type: 'text',
      admin: { description: 'Static image path for the service hero section (e.g. /images/bg-ai-generated.png)' },
    },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },

    // === Enriched Sections (conditionally rendered) ===

    // Audiovisual Section (programming only)
    {
      name: 'audiovisualSection',
      type: 'group',
      admin: { description: 'Audiovisual expertise section (programming service only)' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        {
          name: 'domains',
          type: 'array',
          fields: [{ name: 'name', type: 'text', localized: true }],
        },
      ],
    },

    // Extended Programming (programming only)
    {
      name: 'extendedProgramming',
      type: 'group',
      admin: { description: 'Extended programming services list' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        {
          name: 'items',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
        { name: 'languages', type: 'text', localized: true },
      ],
    },

    // AI Bridge Section
    {
      name: 'aiBridgeSection',
      type: 'group',
      admin: { description: 'AI-IT Bridge section' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'tagline', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        {
          name: 'capabilities',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
      ],
    },

    // Interfaces Gallery
    {
      name: 'interfacesGallery',
      type: 'group',
      admin: { description: 'Gallery of interface screenshots' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'image', type: 'text', required: true, admin: { description: 'Static image path (e.g. /images/interfaces/mcd-byom.webp)' } },
            { name: 'caption', type: 'text', localized: true },
          ],
        },
      ],
    },

    // Certifications
    {
      name: 'certificationsSection',
      type: 'group',
      admin: { description: 'Certification badges section' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
        {
          name: 'badges',
          type: 'array',
          fields: [
            { name: 'image', type: 'text', required: true, admin: { description: 'Static image path (e.g. /images/certifications/crestron-cmpg.webp)' } },
            { name: 'name', type: 'text' },
            { name: 'issuer', type: 'text' },
          ],
        },
      ],
    },

    // References / Clients
    {
      name: 'referencesSection',
      type: 'group',
      admin: { description: 'Client references section' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
        {
          name: 'clients',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'logo', type: 'text', required: true, admin: { description: 'Static image path (e.g. /images/clients/bell.webp)' } },
            { name: 'period', type: 'text' },
            { name: 'url', type: 'text', admin: { description: 'Client website URL' } },
          ],
        },
      ],
    },

    // Warranty / Quality Guarantee
    {
      name: 'warrantySection',
      type: 'group',
      admin: { description: 'Quality guarantee section' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        {
          name: 'items',
          type: 'array',
          fields: [{ name: 'text', type: 'text', localized: true }],
        },
      ],
    },

    // Brochure Download
    {
      name: 'brochureDownload',
      type: 'group',
      admin: { description: 'Brochure download CTA' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'text', localized: true },
        { name: 'buttonText', type: 'text', localized: true },
        { name: 'file', type: 'text', admin: { description: 'Static file path (e.g. /docs/JPrunierInc_EN.V4.pdf)' } },
      ],
    },
  ],
}
