import type { GlobalConfig } from 'payload'

export const UIStrings: GlobalConfig = {
  slug: 'ui-strings',
  access: { read: () => true },
  fields: [
    {
      name: 'strings',
      type: 'array',
      fields: [
        { name: 'key', type: 'text', required: true },
        { name: 'value', type: 'text', required: true, localized: true },
      ],
    },
  ],
}
