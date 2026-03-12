import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
// import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { NewsArticles } from './collections/NewsArticles'
import { Sectors } from './collections/Sectors'
import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { AboutPage } from './globals/AboutPage'
import { ServicesPage } from './globals/ServicesPage'
import { ContactPage } from './globals/ContactPage'
import { NewsPage } from './globals/NewsPage'
import { UIStrings } from './globals/UIStrings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Services, Testimonials, NewsArticles, Sectors],
  globals: [SiteSettings, HomePage, AboutPage, ServicesPage, ContactPage, NewsPage, UIStrings],
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Français', code: 'fr' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  editor: lexicalEditor(),
  plugins: [],
})
