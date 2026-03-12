'use client'

import { motion } from 'framer-motion'
import { Calendar, ExternalLink } from 'lucide-react'

function LinkedInIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
    </svg>
  )
}
import Hero from '../../../components/Hero'
import { useLocalizedData, useT, useLanguage } from '../../../context/LanguageContext'
import '../../../styles/News.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function NewsClient({
  pageEn, pageFr, articlesEn, articlesFr,
}: {
  pageEn: any; pageFr: any; articlesEn: any[]; articlesFr: any[]
}) {
  const page = useLocalizedData(pageEn, pageFr)
  const articles = useLocalizedData(articlesEn, articlesFr)
  const t = useT()
  const { language } = useLanguage()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    })
  }

  return (
    <>
      <Hero
        title={page.hero?.title || ''}
        subtitle={page.hero?.subtitle || ''}
        backgroundImage="/images/bg-bubbles.png"
        centered
        compact
      />

      <section className="section news-section">
        <div className="container">
          <motion.div
            className="news-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {articles.map((article: any) => {
              const imgUrl = article.image?.url || article.image || ''
              return (
                <motion.a
                  key={article.id}
                  href={article.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`news-card${imgUrl ? '' : ' news-card-no-image'}`}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  {imgUrl && (
                    <div className="news-card-image">
                      <img src={imgUrl} alt={article.title} loading="lazy" />
                    </div>
                  )}
                  <div className="news-card-body">
                    <div className="news-card-header">
                      <span className="news-date">
                        <Calendar size={13} />
                        {formatDate(article.date)}
                      </span>
                      <LinkedInIcon size={20} className="news-card-linkedin-badge" />
                    </div>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <span className="news-read-linkedin">
                      {t('news.read_on_linkedin')} <ExternalLink size={13} />
                    </span>
                  </div>
                </motion.a>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="section news-linkedin-cta">
        <div className="container">
          <motion.div
            className="linkedin-cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <LinkedInIcon size={32} className="linkedin-cta-icon" />
            <h2>{t('news.follow_us')}</h2>
            <p>{t('news.follow_text')}</p>
            <a
              href="https://www.linkedin.com/company/jprunier-inc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary linkedin-btn"
            >
              <LinkedInIcon size={18} /> {t('news.follow_linkedin')}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
