'use client'

import { motion } from 'framer-motion'
import { Calendar, ExternalLink, Linkedin as LinkedInIcon } from 'lucide-react'
import Hero from '../../../components/Hero'
import { useLocalizedData, useT, useLanguage } from '../../../context/LanguageContext'
import '../../../styles/News.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
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
            {articles.map((article: any) => (
                <motion.a
                  key={article.id}
                  href={article.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-card news-card-no-image"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
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
              ))}
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
