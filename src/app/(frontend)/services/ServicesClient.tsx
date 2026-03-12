'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Code, Lightbulb, Settings, Zap, ArrowRight } from 'lucide-react'
import Hero from '../../../components/Hero'
import { useLocalizedData, useT } from '../../../context/LanguageContext'
import '../../../styles/Services.css'

const iconMap: Record<string, any> = { Code, Lightbulb, Settings, Zap }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

export default function ServicesClient({
  pageEn, pageFr, servicesEn, servicesFr,
}: {
  pageEn: any; pageFr: any; servicesEn: any[]; servicesFr: any[]
}) {
  const page = useLocalizedData(pageEn, pageFr)
  const services = useLocalizedData(servicesEn, servicesFr)
  const t = useT()

  return (
    <>
      <Hero
        title={page.hero?.title || ''}
        subtitle={page.hero?.subtitle || ''}
        backgroundImage="/images/bg-ai-generated.png"
        centered
        compact
      />

      <section className="section services-intro-section">
        <div className="container">
          <p className="intro-text">{page.intro}</p>
        </div>
      </section>

      <section className="section main-services-section">
        <div className="container">
          <motion.div
            className="services-cards-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {services.map((service: any) => {
              const IconComp = iconMap[service.icon]
              return (
                <motion.div key={service.slug} variants={itemVariants}>
                  <Link href={`/services/${service.slug}`} className="service-link-card">
                    <div className="service-link-icon">
                      {IconComp && <IconComp size={32} />}
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <span className="service-link-cta">
                      {t('services.learn_more')} <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="section crestron-section">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 variants={itemVariants} className="section-title-left">
              {page.crestronSection?.title}
            </motion.h2>
            <motion.p variants={itemVariants} className="crestron-description">
              {page.crestronSection?.description}
            </motion.p>
            <motion.div className="capabilities-grid" variants={containerVariants}>
              {(page.crestronSection?.capabilities || []).map((cap: any, index: number) => (
                <motion.div key={index} className="capability-item" variants={itemVariants} whileHover={{ x: 5 }}>
                  <span className="capability-check">&#10003;</span>
                  <span>{cap.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section expertise-section">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 variants={itemVariants} className="section-title">
              {page.expertise?.title}
            </motion.h2>
            <motion.div className="expertise-grid" variants={containerVariants}>
              {(page.expertise?.categories || []).map((category: any, index: number) => (
                <motion.div key={index} className="expertise-category" variants={itemVariants}>
                  <h3>{category.name}</h3>
                  <ul>
                    {(category.items || []).map((item: any, i: number) => (
                      <li key={i}>
                        <span className="expertise-dot">&bull;</span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
