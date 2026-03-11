import { motion } from 'framer-motion';
import { Calendar, User, Tag } from 'lucide-react';
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
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
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

      {/* News Feed Section */}
      <section className="section news-section">
        <div className="container">
          <motion.div
            className="news-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {news.map((article, index) => (
              <motion.article
                key={article.id}
                className="news-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="news-header">
                  <div className="news-meta">
                    <span className="news-category">{article.category}</span>
                    <span className="news-date">
                      <Calendar size={16} />
                      {formatDate(article.date)}
                    </span>
                  </div>
                  <h3>{article.title}</h3>
                </div>

                <div className="news-body">
                  <p className="news-excerpt">{article.excerpt}</p>
                  <p className="news-content">{article.content}</p>
                </div>

                <div className="news-footer">
                  <span className="news-author">
                    <User size={16} />
                    {t('news.by')} {article.author}
                  </span>
                  <a href="#" className="read-more">
                    {t('news.read_more')}
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section newsletter-section">
        <div className="container">
          <motion.div
            className="newsletter-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 variants={itemVariants}>{t('news.stay_updated')}</motion.h2>
            <motion.p variants={itemVariants}>
              {t('news.newsletter_text')}
            </motion.p>
            <motion.form variants={itemVariants} className="newsletter-form">
              <input
                type="email"
                placeholder={t('news.email_placeholder')}
                required
              />
              <button type="submit" className="btn btn-primary">
                {t('news.subscribe')}
              </button>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
