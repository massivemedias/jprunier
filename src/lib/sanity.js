/**
 * Sanity CMS client + live content fetcher.
 *
 * The site ships with the full content.json / content-fr.json baked into the
 * bundle (the old behavior). Sanity is an *override layer*: on mount the app
 * fetches the documents Jerome can edit (hero titles/subtitles, 4 service
 * title/description blocks, brochure CTA text). Those values are merged on
 * top of the JSON before anything renders.
 *
 * Why an overlay instead of full replacement:
 *  - If Sanity is unreachable the site still renders with the baked content.
 *  - Only the ~25 editable fields travel over the network, not the entire
 *    content tree.
 *  - No server/build dependency on Sanity — purely client-side fetch.
 *
 * Dataset is public so no auth token is needed for reads.
 */

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const PROJECT_ID = '1zpbhz6g'
export const DATASET = 'production'

export const sanityClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2025-01-01',
  // CDN is cached ~1 min — fine for non-urgent copy changes
  useCdn: true,
})

// Helper for building delivery URLs with hotspot / resize params
const builder = imageUrlBuilder(sanityClient)
export const urlForImage = (source) => (source ? builder.image(source) : null)

/**
 * Single GROQ query that pulls every field we expose for editing.
 * All bilingual fields arrive as `{ en, fr }` objects so the overlay helper
 * can pick the right language at read time.
 *
 * Images resolve to `{ asset->{ url }, hotspot, crop }` so the image URL
 * builder can produce responsive hotspot-aware delivery URLs.
 */
const HERO_PAGE_FIELDS = `
  title,
  subtitle,
  backgroundImage{ asset->{url, metadata{dimensions}}, hotspot, crop }
`
const CONTENT_QUERY = `{
  "hero": *[_type == "hero" && _id == "hero"][0]{
    home{ ${HERO_PAGE_FIELDS} },
    services{ ${HERO_PAGE_FIELDS} },
    contact{ ${HERO_PAGE_FIELDS} },
    news{ ${HERO_PAGE_FIELDS} }
  },
  "brochure": *[_type == "brochure" && _id == "brochure"][0]{
    title,
    description,
    buttonText,
    fileUrl,
    "pdfFileUrl": pdfFile.asset->url
  },
  "services": *[_type == "service"] | order(order asc){
    slug,
    order,
    title,
    subtitle,
    description,
    longDescription,
    image{ asset->{url}, hotspot, crop }
  }
}`

/** Fetch editable overrides. Resolves to `null` on any error so callers
 *  can fall back to the baked JSON without UI flicker. */
export async function fetchLiveContent() {
  try {
    return await sanityClient.fetch(CONTENT_QUERY)
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[sanity] fetch failed:', err.message)
    return null
  }
}

/**
 * Merge Sanity overrides on top of a baked content object for a given language.
 *
 * Only the fields we actively edit in the CMS are overwritten; everything
 * else in content.json keeps flowing through untouched.
 */
export function applyOverrides(baseContent, overrides, language) {
  if (!overrides) return baseContent
  const pick = (field) => field?.[language] ?? field?.en

  // Shallow-clone the branches we mutate so React sees new refs and re-renders
  const next = { ...baseContent, hero: { ...baseContent.hero }, services: { ...baseContent.services } }

  // Hero — only overwrite title/subtitle + optional bg image for the 4 pages we expose
  const heroPages = ['home', 'services', 'contact', 'news']
  if (overrides.hero) {
    for (const page of heroPages) {
      const h = overrides.hero[page]
      if (!h) continue
      const bgBuilder = urlForImage(h.backgroundImage)
      next.hero[page] = {
        ...baseContent.hero[page],
        ...(h.title ? { title: pick(h.title) } : {}),
        ...(h.subtitle ? { subtitle: pick(h.subtitle) } : {}),
        // Only override the bg image if Jerome uploaded one. 1600w is plenty
        // for a hero at any viewport; WebP + quality 80 keeps it lean.
        ...(bgBuilder
          ? {
              backgroundImage: bgBuilder.width(1600).quality(80).format('webp').url(),
            }
          : {}),
      }
    }
  }

  // Services — match by slug/id and merge into main_services[]
  if (overrides.services?.length && baseContent.services?.main_services) {
    const bySlug = new Map(overrides.services.map((s) => [s.slug, s]))
    next.services.main_services = baseContent.services.main_services.map((svc) => {
      const o = bySlug.get(svc.id)
      if (!o) return svc
      const imageBuilder = urlForImage(o.image)
      return {
        ...svc,
        ...(o.title ? { title: pick(o.title) } : {}),
        ...(o.subtitle ? { subtitle: pick(o.subtitle) } : {}),
        ...(o.description ? { description: pick(o.description) } : {}),
        ...(o.longDescription ? { long_description: pick(o.longDescription) } : {}),
        // Used as the hero background on /services/:id when present
        ...(imageBuilder
          ? { image_url: imageBuilder.width(1600).quality(80).format('webp').url() }
          : {}),
      }
    })
  }

  // Brochure lives on main_services[0].brochure_download — patch it there.
  if (overrides.brochure && next.services.main_services) {
    const ms = [...next.services.main_services]
    const first = ms[0]
    if (first) {
      // Prefer uploaded PDF when Jerome dropped one in Sanity, otherwise keep
      // the manually-entered URL (e.g. original Crestron CDN).
      const preferredUrl =
        overrides.brochure.pdfFileUrl || overrides.brochure.fileUrl
      ms[0] = {
        ...first,
        brochure_download: {
          ...(first.brochure_download || {}),
          ...(overrides.brochure.title ? { title: pick(overrides.brochure.title) } : {}),
          ...(overrides.brochure.description
            ? { description: pick(overrides.brochure.description) }
            : {}),
          ...(overrides.brochure.buttonText
            ? { button_text: pick(overrides.brochure.buttonText) }
            : {}),
          ...(preferredUrl ? { file_url: preferredUrl } : {}),
        },
      }
      next.services.main_services = ms
    }
  }

  return next
}
