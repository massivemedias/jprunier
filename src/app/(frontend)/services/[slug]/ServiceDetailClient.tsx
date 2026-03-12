'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Lightbulb, Settings, Zap, CheckCircle, ArrowLeft, Mail, Download, Award, Shield, X } from 'lucide-react'
import Hero from '../../../../components/Hero'
import { useLocalizedData, useT } from '../../../../context/LanguageContext'
import '../../../../styles/ServiceDetail.css'

const iconMap: Record<string, any> = { Code, Lightbulb, Settings, Zap }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

function ImageLightbox({ isOpen, imageSrc, imageAlt, onClose }: {
  isOpen: boolean; imageSrc: string; imageAlt: string; onClose: () => void
}) {
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button className="lightbox-close" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="lightbox-image"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function ServiceDetailClient({
  serviceEn, serviceFr, allServicesEn, allServicesFr,
}: {
  serviceEn: any; serviceFr: any; allServicesEn: any[]; allServicesFr: any[]
}) {
  const service = useLocalizedData(serviceEn, serviceFr)
  const allServices = useLocalizedData(allServicesEn, allServicesFr)
  const t = useT()
  const [lightbox, setLightbox] = useState({ open: false, src: '', alt: '' })

  if (!service) {
    return (
      <div className="service-not-found">
        <h2>{t('services.not_found')}</h2>
        <Link href="/services" className="btn btn-primary">{t('services.back')}</Link>
      </div>
    )
  }

  const IconComp = iconMap[service.icon]

  return (
    <>
      <Hero
        title={service.title}
        subtitle={service.description}
        backgroundImage={service.heroImage || '/images/bg-ai-generated.png'}
        centered
        compact
      />

      <section className="service-detail-breadcrumb">
        <div className="container">
          <Link href="/services" className="breadcrumb-link">
            <ArrowLeft size={16} /> {t('services.back')}
          </Link>
        </div>
      </section>

      <section className="section service-detail-main">
        <div className="container">
          <motion.div
            className="service-detail-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
          >
            <motion.div className="service-detail-content" variants={itemVariants}>
              <div className="service-detail-icon-header">
                {IconComp && <div className="service-detail-icon"><IconComp size={32} /></div>}
                <h2>{service.pageTitle || service.title}</h2>
              </div>
              <p className="service-detail-desc">{service.longDescription || service.details}</p>

              {service.features && service.features.length > 0 && (
                <div className="service-features">
                  <h3>{t('services.what_we_offer')}</h3>
                  <div className="features-list">
                    {service.features.map((feature: any, i: number) => (
                      <motion.div key={i} className="feature-item" variants={itemVariants}>
                        <CheckCircle size={18} className="feature-check" />
                        <div>
                          <strong>{feature.title}</strong>
                          <p>{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div className="service-detail-sidebar" variants={itemVariants}>
              {(service.bulletsLeft?.length > 0 || service.bulletsRight?.length > 0) && (
                <div className="sidebar-card">
                  <h4>{t('services.key_capabilities')}</h4>
                  <ul>
                    {[...(service.bulletsLeft || []), ...(service.bulletsRight || [])].map((item: any, i: number) => (
                      <li key={i}><CheckCircle size={14} /> {item.text}</li>
                    ))}
                  </ul>
                </div>
              )}

              {service.technologies && service.technologies.length > 0 && (
                <div className="sidebar-card">
                  <h4>{t('services.technologies')}</h4>
                  <div className="tech-tags">
                    {service.technologies.map((tech: any, i: number) => (
                      <span key={i} className="tech-tag">{tech.name}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="sidebar-cta">
                <h4>{t('services.need_help')}</h4>
                <p>{t('services.cta_text')}</p>
                <Link href="/contact" className="btn btn-primary">
                  <Mail size={16} /> {t('nav.contact')}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Audiovisual Section (programming only) */}
      {service.audiovisualSection?.title && (
        <section className="section service-audiovisual">
          <div className="container">
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }}>
              <motion.h2 variants={itemVariants}>{service.audiovisualSection.title}</motion.h2>
              <motion.p className="section-description" variants={itemVariants}>
                {service.audiovisualSection.description}
              </motion.p>
              <motion.div className="audiovisual-domains" variants={itemVariants}>
                {service.audiovisualSection.domains?.map((domain: any, i: number) => (
                  <span key={i} className="domain-tag">{domain.name}</span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Extended Programming Services */}
      {service.extendedProgramming?.title && (
        <section className="section service-extended-programming">
          <div className="container">
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }}>
              <motion.h2 variants={itemVariants}>{service.extendedProgramming.title}</motion.h2>
              <motion.div className="extended-services-list" variants={itemVariants}>
                {service.extendedProgramming.items?.map((item: any, i: number) => (
                  <div key={i} className="extended-service-item">
                    <CheckCircle size={16} className="feature-check" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </motion.div>
              <motion.p className="extended-languages" variants={itemVariants}>
                {service.extendedProgramming.languages}
              </motion.p>
            </motion.div>
          </div>
        </section>
      )}

      {/* AI Bridge Section */}
      {service.aiBridgeSection?.title && (
        <section className="section service-ai-bridge">
          <div className="container">
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }}>
              <motion.h2 variants={itemVariants}>{service.aiBridgeSection.title}</motion.h2>
              <motion.p className="ai-bridge-tagline" variants={itemVariants}>
                {service.aiBridgeSection.tagline}
              </motion.p>
              <motion.p className="section-description" variants={itemVariants}>
                {service.aiBridgeSection.description}
              </motion.p>
              <motion.div className="ai-bridge-capabilities" variants={itemVariants}>
                {service.aiBridgeSection.capabilities?.map((cap: any, i: number) => (
                  <div key={i} className="ai-bridge-capability">
                    <CheckCircle size={16} className="feature-check" />
                    <span>{cap.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Interfaces Gallery */}
      {service.interfacesGallery?.items?.length > 0 && (
        <section className="section service-interfaces">
          <div className="container">
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }}>
              <motion.h2 variants={itemVariants}>{service.interfacesGallery.title}</motion.h2>
              <motion.p className="section-description" variants={itemVariants}>
                {service.interfacesGallery.subtitle}
              </motion.p>
              <motion.div className="interfaces-grid" variants={itemVariants}>
                {service.interfacesGallery.items.map((item: any, i: number) => {
                  const imgUrl = item.image || ''
                  const imgAlt = item.caption || ''
                  return (
                    <div
                      key={i}
                      className="interface-card"
                      onClick={() => setLightbox({ open: true, src: imgUrl, alt: imgAlt })}
                    >
                      <img src={imgUrl} alt={imgAlt} loading="lazy" />
                      <div className="interface-caption">{item.caption}</div>
                    </div>
                  )
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {service.certificationsSection?.badges?.length > 0 && (
        <section className="section service-certifications">
          <div className="container">
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }}>
              <motion.div className="certifications-header" variants={itemVariants}>
                <Award size={28} className="section-icon" />
                <h2>{service.certificationsSection.title}</h2>
              </motion.div>
              <motion.p className="section-description" variants={itemVariants}>
                {service.certificationsSection.subtitle}
              </motion.p>
              <motion.div className="certifications-grid" variants={itemVariants}>
                {service.certificationsSection.badges.map((badge: any, i: number) => (
                  <div key={i} className="certification-badge">
                    <img src={badge.image || ''} alt={badge.name} loading="lazy" />
                    <span className="badge-name">{badge.name}</span>
                    <span className="badge-issuer">{badge.issuer}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* References */}
      {service.referencesSection?.clients?.length > 0 && (
        <section className="section service-references">
          <div className="container">
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }}>
              <motion.h2 variants={itemVariants}>{service.referencesSection.title}</motion.h2>
              <motion.p className="section-description" variants={itemVariants}>
                {service.referencesSection.subtitle}
              </motion.p>
              <motion.div className="clients-grid" variants={itemVariants}>
                {service.referencesSection.clients.map((client: any, i: number) => (
                  <div key={i} className="client-card">
                    <img src={client.logo || ''} alt={client.name} className="client-logo" loading="lazy" />
                    <span className="client-name">{client.name}</span>
                    {client.period && <span className="client-period">{client.period}</span>}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Warranty */}
      {service.warrantySection?.items?.length > 0 && (
        <section className="section service-warranty">
          <div className="container">
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }}>
              <motion.div className="warranty-header" variants={itemVariants}>
                <Shield size={28} className="section-icon" />
                <h2>{service.warrantySection.title}</h2>
              </motion.div>
              <motion.div className="warranty-items" variants={itemVariants}>
                {service.warrantySection.items.map((item: any, i: number) => (
                  <div key={i} className="warranty-item">
                    <CheckCircle size={16} className="feature-check" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Brochure Download */}
      {(service.brochureDownload?.file || service.brochureDownload?.fileUrl) && (
        <section className="section service-brochure">
          <div className="container">
            <motion.div
              className="brochure-card"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
            >
              <motion.div className="brochure-content" variants={itemVariants}>
                <Download size={28} className="section-icon" />
                <div>
                  <h3>{service.brochureDownload.title}</h3>
                  <p>{service.brochureDownload.description}</p>
                </div>
              </motion.div>
              <motion.a
                href={service.brochureDownload.file || '#'}
                className="btn btn-primary brochure-btn"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
              >
                <Download size={16} /> {service.brochureDownload.buttonText}
              </motion.a>
            </motion.div>
          </div>
        </section>
      )}

      {/* Other Services */}
      <section className="section service-detail-others">
        <div className="container">
          <h2>{t('services.other_services')}</h2>
          <motion.div
            className="other-services-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
          >
            {allServices
              .filter((s: any) => s.slug !== service.slug)
              .map((s: any) => {
                const OtherIcon = iconMap[s.icon]
                return (
                  <motion.div key={s.slug} variants={itemVariants}>
                    <Link href={`/services/${s.slug}`} className="other-service-card">
                      {OtherIcon && <OtherIcon size={24} className="other-service-icon" />}
                      <h4>{s.title}</h4>
                      <p>{s.description}</p>
                    </Link>
                  </motion.div>
                )
              })}
          </motion.div>
        </div>
      </section>

      <ImageLightbox
        isOpen={lightbox.open}
        imageSrc={lightbox.src}
        imageAlt={lightbox.alt}
        onClose={() => setLightbox({ open: false, src: '', alt: '' })}
      />
    </>
  )
}
