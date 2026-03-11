import { motion } from 'framer-motion';
import { Calendar, ExternalLink } from 'lucide-react';
import Hero from '../components/Hero';
import { useContent, useT, useLanguage } from '../context/LanguageContext';
import './News.css';

const base = import.meta.env.BASE_URL;

const LinkedInIcon = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function News() {
  const { content, news } = useContent();
  const t = useT();
  const { language } = useLanguage();
  const { hero } = content;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Hero
        title={hero.news.title}
        subtitle={hero.news.subtitle}
        backgroundImage={`${base}images/bg-bubbles.png`}
        centered={true}
        compact={true}
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
            {news.map((article) => (
              <motion.a
                key={article.id}
                href={article.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="news-card"
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <div className="news-card-header">
                  <LinkedInIcon size={18} className="news-card-linkedin-badge" />
                  <span className="news-date">
                    <Calendar size={13} />
                    {formatDate(article.date)}
                  </span>
                </div>
                <div className="news-card-body">
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
  );
}
