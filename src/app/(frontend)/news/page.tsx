import { getGlobal, getCollection } from '../../../lib/payload'
import NewsClient from './NewsClient'

export const dynamic = 'force-dynamic'

export default async function NewsPage() {
  const [newsPage, articles] = await Promise.all([
    getGlobal('news-page'),
    getCollection('news-articles', { sort: '-date' }),
  ])

  return (
    <NewsClient
      pageEn={newsPage.en}
      pageFr={newsPage.fr}
      articlesEn={articles.en}
      articlesFr={articles.fr}
    />
  )
}
