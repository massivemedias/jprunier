import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import { useContent, useT } from '../context/LanguageContext';
import './About.css';

const base = import.meta.env.BASE_URL;

/* Helper: convert **bold** markers to <strong> */
function renderBold(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

export default function About() {
  const { content } = useContent();
  const t = useT();
  const { hero, about } = content;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <>
      <div className="about-page-hero">
        <Hero
          title={hero.about.title}
          subtitle={hero.about.subtitle}
          backgroundImage={`${base}images/bg-abstract.png`}
          centered={true}
          compact={true}
        />
      </div>

      {/* About Us — clean professional section */}
      <section className="section about-fullwidth">

        <div className="container">
          <motion.div
            className="about-two-col"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div className="about-col" variants={itemVariants}>
              <h2 className="about-heading">{t('about.who_we_are')}</h2>
              {(about.intro_left || about.intro).split('\n\n').map((p, i) => (
                <p key={i}>{renderBold(p)}</p>
              ))}
            </motion.div>
            <motion.div className="about-col" variants={itemVariants}>
              {(about.intro_right || about.mission).split('\n\n').map((p, i) => (
                <p key={i}>{renderBold(p)}</p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Values — full-width with background image */}
      <section
        className="section values-fullwidth"
        style={{ backgroundImage: `url(${base}images/photos/about-bg.webp)` }}
      >
        <div className="values-fullwidth-overlay"></div>
        <div className="container values-fullwidth-content">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 className="values-heading" variants={itemVariants}>
              {t('about.core_values')}
            </motion.h2>
            <motion.div className="values-divider" variants={itemVariants} />

            <motion.div className="values-grid-flat" variants={containerVariants}>
              {about.values.map((value, index) => (
                <motion.div key={index} className="value-item" variants={itemVariants}>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
