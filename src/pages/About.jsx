import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import TestimonialCard from '../components/TestimonialCard';
import { useContent, useT } from '../context/LanguageContext';
import './About.css';

const base = import.meta.env.BASE_URL;

export default function About() {
  const { content, testimonials } = useContent();
  const t = useT();
  const { hero, about } = content;

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

  return (
    <>
      <Hero
        title={hero.about.title}
        subtitle={hero.about.subtitle}
        backgroundImage={`${base}images/bg-abstract.png`}
        centered={true}
      />

      {/* Company Overview Section */}
      <section className="section about-section">
        <div className="container">
          <motion.div
            className="about-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div className="about-intro" variants={itemVariants}>
              <h2>{t('about.who_we_are')}</h2>
              <p>{about.intro}</p>
            </motion.div>

            <motion.div className="about-mission" variants={itemVariants}>
              <h3>{t('about.our_mission')}</h3>
              <p>{about.mission}</p>
            </motion.div>

            <motion.div className="about-vision" variants={itemVariants}>
              <h3>{t('about.our_vision')}</h3>
              <p>{about.vision}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section values-section">
        <div className="container">
          <div className="section-title">
            <h2>{t('about.core_values')}</h2>
            <p className="section-subtitle">{t('about.values_subtitle')}</p>
          </div>

          <motion.div
            className="grid grid-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {about.values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-title">
            <h2>{t('about.testimonials_title')}</h2>
            <p className="section-subtitle">{t('about.testimonials_subtitle')}</p>
          </div>

          <motion.div
            className="grid grid-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {testimonials.map((testimonial) => (
              <motion.div key={testimonial.id} variants={itemVariants}>
                <TestimonialCard
                  author={testimonial.author}
                  title={testimonial.title}
                  company={testimonial.company}
                  text={testimonial.text}
                  avatar={testimonial.avatar}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
