'use client'

import { motion } from 'framer-motion'
import Hero from '../../../components/Hero'
import TestimonialCard from '../../../components/TestimonialCard'
import { useLocalizedData, useT } from '../../../context/LanguageContext'
import '../../../styles/About.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
}

export default function AboutClient({
  aboutEn, aboutFr, testimonialsEn, testimonialsFr,
}: {
  aboutEn: any; aboutFr: any; testimonialsEn: any[]; testimonialsFr: any[]
}) {
  const about = useLocalizedData(aboutEn, aboutFr)
  const testimonials = useLocalizedData(testimonialsEn, testimonialsFr)
  const t = useT()

  return (
    <>
      <Hero
        title={about.hero?.title || ''}
        subtitle={about.hero?.subtitle || ''}
        backgroundImage="/images/bg-abstract.png"
        centered
        compact
      />

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
            {(about.values || []).map((value: any, index: number) => (
              <motion.div key={index} className="value-card" variants={itemVariants} whileHover={{ y: -5 }}>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
            {testimonials.map((testimonial: any) => (
              <motion.div key={testimonial.id} variants={itemVariants}>
                <TestimonialCard
                  author={testimonial.author}
                  title={testimonial.title}
                  company={testimonial.company}
                  text={testimonial.text}
                  avatar={testimonial.avatar?.url || testimonial.avatarUrl}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
