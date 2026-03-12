import { getCollectionBySlug, getCollection, getAllSlugs } from '../../../../lib/payload'
import ServiceDetailClient from './ServiceDetailClient'

export async function generateStaticParams() {
  const slugs = await getAllSlugs('services')
  return slugs.map((slug: string) => ({ slug }))
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [service, allServices] = await Promise.all([
    getCollectionBySlug('services', slug),
    getCollection('services', { sort: 'sortOrder' }),
  ])

  return (
    <ServiceDetailClient
      serviceEn={service.en}
      serviceFr={service.fr}
      allServicesEn={allServices.en}
      allServicesFr={allServices.fr}
    />
  )
}
