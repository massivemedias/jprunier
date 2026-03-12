import { getGlobal, getCollection } from '../../../lib/payload'
import AboutClient from './AboutClient'

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const [aboutPage, testimonials] = await Promise.all([
    getGlobal('about-page'),
    getCollection('testimonials'),
  ])

  return (
    <AboutClient
      aboutEn={aboutPage.en}
      aboutFr={aboutPage.fr}
      testimonialsEn={testimonials.en}
      testimonialsFr={testimonials.fr}
    />
  )
}
