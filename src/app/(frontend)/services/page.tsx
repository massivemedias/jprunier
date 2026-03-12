import { getGlobal, getCollection } from '../../../lib/payload'
import ServicesClient from './ServicesClient'

export default async function ServicesPage() {
  const [servicesPage, services] = await Promise.all([
    getGlobal('services-page'),
    getCollection('services', { sort: 'sortOrder' }),
  ])

  return (
    <ServicesClient
      pageEn={servicesPage.en}
      pageFr={servicesPage.fr}
      servicesEn={services.en}
      servicesFr={services.fr}
    />
  )
}
