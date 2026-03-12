import { getGlobal, getCollection } from '../../lib/payload'
import HomeClient from './HomeClient'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [homePage, services, sectors] = await Promise.all([
    getGlobal('home-page'),
    getCollection('services', { sort: 'sortOrder' }),
    getCollection('sectors', { sort: 'sortOrder' }),
  ])

  return (
    <HomeClient
      homeEn={homePage.en}
      homeFr={homePage.fr}
      servicesEn={services.en}
      servicesFr={services.fr}
      sectorsEn={sectors.en}
      sectorsFr={sectors.fr}
    />
  )
}
