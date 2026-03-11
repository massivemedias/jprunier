import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  ctaPrimary,
  ctaPrimaryLink,
  ctaPrimaryIcon,
  ctaSecondary,
  ctaSecondaryLink,
  centered = false,
}) {
  return (
    <section
      className={`hero ${centered ? 'hero-centered' : ''}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content container">
        <div className="hero-text">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
            >
              {subtitle}
            </motion.p>
          )}

          {(ctaPrimary || ctaSecondary) && (
            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            >
              {ctaPrimary && (
                <Link to={ctaPrimaryLink || '/contact'} className="btn btn-primary hero-cta-btn">
                  {ctaPrimaryIcon === 'mail' && <Mail size={18} />}
                  {ctaPrimary}
                </Link>
              )}
              {ctaSecondary && (
                <Link to={ctaSecondaryLink || '/services'} className="btn btn-secondary hero-cta-secondary">
                  {ctaSecondary}
                  <ArrowRight size={18} />
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <motion.div
        className="hero-accent"
        animate={{ y: [0, -20, 0], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  );
}
