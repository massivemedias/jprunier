import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import sharp from 'sharp'
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
    meta: {
      titleSuffix: ' — JPrunier CMS',
      description: 'Panneau d\'administration JPrunier Inc.',
      icons: [{ url: '/favicon.ico' }],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    dateFormat: 'dd/MM/yyyy HH:mm',
    avatar: 'gravatar',
    livePreview: {
      url: ({ data, collectionConfig, globalConfig }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jprunier.com'
        if (collectionConfig?.slug === 'services' && data?.slug) {
          return `${baseUrl}/services/${data.slug}`
        }
        if (globalConfig?.slug === 'home-page') return baseUrl
        if (globalConfig?.slug === 'about-page') return `${baseUrl}/about`
        if (globalConfig?.slug === 'services-page') return `${baseUrl}/services`
        if (globalConfig?.slug === 'contact-page') return `${baseUrl}/contact`
        if (globalConfig?.slug === 'news-page') return `${baseUrl}/news`
        return baseUrl
      },
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 812 },
        { label: 'Tablette', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
      collections: ['services'],
      globals: ['home-page', 'about-page', 'services-page', 'contact-page', 'news-page'],
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
  sharp,
  plugins: [],
})
