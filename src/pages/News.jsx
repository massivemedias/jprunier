import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import { useContent, useT } from '../context/LanguageContext';
import './News.css';

const base = import.meta.env.BASE_URL;

// Elfsight LinkedIn Feed widget — auto-syncs with JPrunier's LinkedIn company page.
// Free plan; the Elfsight badge at the bottom is expected.
const ELFSIGHT_WIDGET_ID = '47ca587a-8c0c-4753-8dee-30cd78a1be4c';

const LinkedInIcon = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function News() {
  const { content } = useContent();
  const t = useT();
  const { hero } = content;

  // Load the Elfsight platform.js only when this page is mounted so the script
  // doesn't ship on other routes. Safe to call multiple times — the script
  // self-deduplicates by checking `window.eapps`.
  useEffect(() => {
    if (document.querySelector('script[src*="elfsightcdn.com/platform.js"]')) return;
    const s = document.createElement('script');
    s.src = 'https://elfsightcdn.com/platform.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <>
      <Hero
        title={hero.news.title}
        subtitle={hero.news.subtitle}
        backgroundImage={hero.news.backgroundImage || `${base}images/bg-bubbles.png`}
        centered={true}
        compact={true}
      />

      <section className="section news-section">
        <div className="container">
          <motion.div
            className="news-feed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Elfsight widget — renders once platform.js loads and the div is in view */}
            <div className={`elfsight-app-${ELFSIGHT_WIDGET_ID}`} data-elfsight-app-lazy />
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
