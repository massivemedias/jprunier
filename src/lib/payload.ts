import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  return getPayload({ config })
}

export async function getGlobal(slug: string) {
  const payload = await getPayloadClient()
  const [en, fr] = await Promise.all([
    payload.findGlobal({ slug: slug as any, locale: 'en' }),
    payload.findGlobal({ slug: slug as any, locale: 'fr' }),
  ])
  return { en, fr }
}

export async function getCollection(slug: string, options?: { sort?: string; limit?: number }) {
  const payload = await getPayloadClient()
  const [en, fr] = await Promise.all([
    payload.find({ collection: slug as any, locale: 'en', sort: options?.sort, limit: options?.limit || 100, depth: 2 }),
    payload.find({ collection: slug as any, locale: 'fr', sort: options?.sort, limit: options?.limit || 100, depth: 2 }),
  ])
  return { en: en.docs, fr: fr.docs }
}

export async function getUIStringsMap() {
  const { en, fr } = await getGlobal('ui-strings')
  const mapEn: Record<string, string> = {}
  const mapFr: Record<string, string> = {}
  for (const s of (en as any).strings || []) {
    mapEn[s.key] = s.value
  }
  for (const s of (fr as any).strings || []) {
    mapFr[s.key] = s.value
  }
  return { en: mapEn, fr: mapFr }
}

export async function getCollectionBySlug(collection: string, slug: string) {
  const payload = await getPayloadClient()
  const [en, fr] = await Promise.all([
    payload.find({ collection: collection as any, locale: 'en', where: { slug: { equals: slug } }, limit: 1, depth: 2 }),
    payload.find({ collection: collection as any, locale: 'fr', where: { slug: { equals: slug } }, limit: 1, depth: 2 }),
  ])
  return { en: en.docs[0] || null, fr: fr.docs[0] || null }
}

export async function getAllSlugs(collection: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({ collection: collection as any, limit: 100 })
  return result.docs.map((doc: any) => doc.slug)
}

export async function getLayoutData() {
  const [siteSettings, homePage, uiStrings, services] = await Promise.all([
    getGlobal('site-settings'),
    getGlobal('home-page'),
    getUIStringsMap(),
    getCollection('services', { sort: 'sortOrder' }),
  ])

  const settingsEn = siteSettings.en as any
  const settingsFr = siteSettings.fr as any
  const homeEn = homePage.en as any
  const homeFr = homePage.fr as any

  return {
    uiStrings,
    servicesEn: services.en.map((s: any) => ({ slug: s.slug, title: s.title })),
    servicesFr: services.fr.map((s: any) => ({ slug: s.slug, title: s.title })),
    footerEn: {
      companyName: settingsEn.companyName,
      ctaTitle: homeEn.ctaSection?.title || 'Ready to Transform Your Space?',
      ctaSubtitle: homeEn.ctaSection?.subtitle || '',
      ctaButton: homeEn.ctaSection?.button || 'Get Started',
      social: settingsEn.social || { linkedin: '', github: '', email: '' },
    },
    footerFr: {
      companyName: settingsFr.companyName || settingsEn.companyName,
      ctaTitle: homeFr.ctaSection?.title || homeEn.ctaSection?.title || '',
      ctaSubtitle: homeFr.ctaSection?.subtitle || homeEn.ctaSection?.subtitle || '',
      ctaButton: homeFr.ctaSection?.button || homeEn.ctaSection?.button || '',
      social: settingsEn.social || { linkedin: '', github: '', email: '' },
    },
  }
}
