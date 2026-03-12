import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Utilisateur', plural: 'Utilisateurs' },
  admin: {
    useAsTitle: 'email',
    group: 'Configuration',
    description: 'Comptes administrateurs du CMS',
  },
  auth: true,
  fields: [],
}
