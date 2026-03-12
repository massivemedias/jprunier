'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code, Lightbulb, Settings, Zap,
  ChevronDown, ChevronUp,
  Shield, Award, GraduationCap,
  Mail, LayoutGrid, Link2, MessageCircle,
} from 'lucide-react'
import Hero from '../../components/Hero'
import { useLocalizedData, useT } from '../../context/LanguageContext'
import '../../styles/Home.css'

const iconMap: Record<string, any> = { Code, Lightbulb, Settings, Zap }
const accordionIcons: Record<string, any> = { grid: LayoutGrid, link: Link2, chat: MessageCircle }
const expertiseIcons = [Shield, Award, GraduationCap]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function HomeClient({
  homeEn, homeFr, servicesEn, servicesFr, sectorsEn, sectorsFr,
}: {
  homeEn: any; homeFr: any; servicesEn: any[]; servicesFr: any[]; sectorsEn: any[]; sectorsFr: any[]
}) {
  const home = useLocalizedData(homeEn, homeFr)
  const services = useLocalizedData(servicesEn, servicesFr)
  const sectors = useLocalizedData(sectorsEn, sectorsFr)
  const t = useT()
  const [expandedAccordion, setExpandedAccordion] = useState(0)

  return (
    <>
      {/* 1. HERO */}
      <Hero
        title={home.hero?.title || ''}
        subtitle={home.hero?.subtitle || ''}
        backgroundImage="/images/bg-bubbles.png"
        ctaPrimary={t('nav.contact')}
        ctaPrimaryLink="/contact"
        ctaPrimaryIcon="mail"
        ctaSecondary={t('nav.services')}
        ctaSecondaryLink="/services"
      />

      {/* 2. YOUR TECHNICAL GATEWAY */}
      <section className="section-light gateway-section">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>{home.gateway?.title}</h2>
            <p className="gateway-subtitle">{home.gateway?.subtitle}</p>
            <img src="/images/crestron-logo.png" alt="Crestron Services Provider" className="gateway-logo" />
          </motion.div>
        </div>
      </section>

      {/* 3. TECHNOLOGIES WE INTEGRATE */}
      <section className="section-light partners-section-light">
        <div className="container">
          <motion.h2
            className="section-title-left-dark"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-highlight">{t('home.technologies')}</span>{t('home.technologies_suffix')}
          </motion.h2>
          <motion.div
            className="partners-row"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {(home.techPartners || []).map((partner: any, index: number) => (
              <motion.div key={index} className="partner-logo-light" variants={itemVariants}>
                <img src={`/images/${partner.logo?.replace(/^.*\//, '') || partner.name?.toLowerCase() + '-bw.png'}`} alt={partner.name} className="partner-logo-img-dark" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. GLOBAL SERVICES */}
      <section className="section services-home-section" style={{ backgroundImage: 'url(/images/hero-bg.png)' }}>
        <div className="services-overlay"></div>
        <div className="container services-home-content">
          <motion.h2
            className="services-home-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('home.global_services')}
          </motion.h2>

          {services.length > 0 && (
            <motion.div
              className="service-card-featured glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="service-featured-header">
                <div className="service-featured-icon"><Code size={28} /></div>
                <h3>{services[0].title}</h3>
              </div>
              <p className="service-featured-desc">{services[0].description}</p>
              <div className="service-featured-details">
                <div className="detail-column">
                  {(services[0].bulletsLeft || []).map((item: any, i: number) => (
                    <p key={i}>&#8226; {item.text}</p>
                  ))}
                </div>
                <div className="detail-column">
                  {(services[0].bulletsRight || []).map((item: any, i: number) => (
                    <p key={i}>&#8226; {item.text}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            className="services-grid-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.slice(1).map((service: any) => {
              const IconComp = iconMap[service.icon]
              return (
                <motion.div key={service.slug} variants={itemVariants}>
                  <Link href={`/services/${service.slug}`} className="service-card-small glass-card">
                    <div className="service-small-icon">{IconComp && <IconComp size={24} />}</div>
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* 5. AI & AV */}
      <section className="section-light aiav-section">
        <div className="container">
          <motion.div
            className="aiav-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aiav-text">
              <h2 className="aiav-title">{t('home.ai_av')}</h2>
              <p className="aiav-subtitle">{t('home.here_we_are')}</p>
            </div>
            <div className="aiav-image">
              <img src="/images/icon-connection.png" alt="AI AV Connection" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. CONNECTING SPACES — accordion */}
      <section className="section accordion-section">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {(home.connectingItems || []).map((item: any, index: number) => {
              const AccIcon = accordionIcons[item.icon]
              const isOpen = expandedAccordion === index
              return (
                <motion.div
                  key={index}
                  className={`accordion-item ${isOpen ? 'accordion-open' : ''}`}
                  variants={itemVariants}
                  onClick={() => setExpandedAccordion(isOpen ? -1 : index)}
                >
                  <div className="accordion-header">
                    <div className="accordion-icon-circle">
                      {AccIcon && <AccIcon size={20} color="white" />}
                    </div>
                    <h3>{item.title}</h3>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="accordion-body"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{item.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* 7. EXPERTISE YOU CAN TRUST */}
      <section className="section-light expertise-home-section" style={{ backgroundImage: 'url(/images/bg-ia-av-spheres.jpg)' }}>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('home.expertise_title')}
          </motion.h2>
          <motion.div
            className="expertise-home-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {(home.expertiseItems || []).map((item: any, index: number) => {
              const ExIcon = expertiseIcons[index]
              return (
                <motion.div key={index} className="expertise-home-item" variants={itemVariants}>
                  <div className="expertise-icon-circle">{ExIcon && <ExIcon size={24} />}</div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* 8. CTA BANNER — purple */}
      <section className="cta-banner-section">
        <div className="container">
          <motion.div
            className="cta-banner-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>{t('home.questions')}</h2>
            <Link href="/contact" className="btn-cta-outline">
              <Mail size={18} /> {t('home.email_us')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 9. ACTIVE ACROSS ALL SECTORS */}
      <section className="section sectors-home-section" style={{ backgroundImage: 'url(/images/bg-neural-network.png)' }}>
        <div className="container">
          <motion.div
            className="sectors-split"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="sectors-photo">
              <img src="/images/office-photo.jpg" alt="Office" />
            </div>
            <div className="sectors-content">
              <h2>{t('home.sectors_title')}</h2>
              <div className="sectors-list">
                {sectors.map((sector: any, index: number) => (
                  <div key={index} className="sector-dot-item">
                    <span className={`sector-dot sector-dot-${index}`}></span>
                    <span>{sector.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. DISCOVER CTA */}
      <section className="section discover-cta-section">
        <div className="container">
          <motion.div
            className="discover-card glass-card"
            style={{ backgroundImage: 'url(/images/bg-variante.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="discover-overlay"></div>
            <div className="discover-content">
              <h2>{home.discoverCta?.title}</h2>
              <p>{home.discoverCta?.subtitle}</p>
              <Link href="/contact" className="btn btn-primary">{home.discoverCta?.button}</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 11. ACHIEVEMENTS */}
      <section className="section-light achievements-section">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>{home.achievements?.title}</h2>
            <p>{home.achievements?.subtitle}</p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
