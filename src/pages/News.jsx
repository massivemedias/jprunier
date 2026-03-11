import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Linkedin } from 'lucide-react';
import Hero from '../components/Hero';
import { useContent, useT, useLanguage } from '../context/LanguageContext';
import './News.css';

const base = import.meta.env.BASE_URL;

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
                <div className="news-card-content">
                  <div className="news-card-top">
                    <span className="news-date">
                      <Calendar size={14} />
                      {formatDate(article.date)}
                    </span>
                    <Linkedin size={20} className="news-linkedin-icon" />
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                </div>
                <div className="news-card-footer">
                  <span className="news-read-linkedin">
                    {t('news.read_on_linkedin')} <ExternalLink size={14} />
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
            <Linkedin size={32} className="linkedin-cta-icon" />
            <h2>{t('news.follow_us')}</h2>
            <p>{t('news.follow_text')}</p>
            <a
              href="https://www.linkedin.com/company/jprunier-inc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary linkedin-btn"
            >
              <Linkedin size={18} /> {t('news.follow_linkedin')}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
