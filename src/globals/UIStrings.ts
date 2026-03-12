import type { GlobalConfig } from 'payload'

export const UIStrings: GlobalConfig = {
  slug: 'ui-strings',
  label: 'Traductions UI',
  admin: {
    group: 'Configuration',
    description: 'Textes et labels de l\'interface utilisateur (boutons, titres de sections, etc.)',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'strings',
      type: 'array',
      labels: { singular: 'Traduction', plural: 'Traductions' },
      admin: { description: 'Paires clé/valeur pour les textes de l\'interface' },
      fields: [
        { name: 'key', type: 'text', required: true, admin: { description: 'Identifiant unique (ex: nav.home, cta.contact)' } },
        { name: 'value', type: 'text', required: true, localized: true, admin: { description: 'Texte affiché' } },
      ],
    },
  ],
}
