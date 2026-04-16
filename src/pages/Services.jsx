import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Code, Compass, LayoutDashboard, Wrench,
  CheckCircle, Mail, Download, Award, Shield,
} from 'lucide-react';
import Hero from '../components/Hero';
import ImageLightbox from '../components/ImageLightbox';
import { useContent, useT } from '../context/LanguageContext';
import './Services.css';
import './ServiceDetail.css';

const base = import.meta.env.BASE_URL;
const iconMap = { Code, Compass, LayoutDashboard, Wrench };

export default function Services() {
  const { content } = useContent();
  const t = useT();
  const { hero, services } = content;
  const [activeSection, setActiveSection] = useState('');
  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0 });
  const sectionRefs = useRef({});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  /* Track which section is in view for active submenu highlighting */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* All menu items: services + shared sections */
  const menuItems = [
    ...services.main_services.map((s) => ({ id: s.id, label: s.title, icon: s.icon })),
    { id: 'crestron', label: services.crestron_section.title },
    { id: 'ai-bridge', label: t('services.ai_bridge') },
    { id: 'certifications', label: services.certifications_section?.title || t('services.certifications') },
  ];

  return (
    <>
      <Hero
        title={hero.services.title}
        subtitle={hero.services.subtitle}
        backgroundImage={`${base}images/bg-ai-generated.png`}
        centered={true}
        compact={true}
      />

      {/* Intro */}
      <section className="section services-intro-section">
        <div className="container">
          <p className="intro-text">{services.intro}</p>
        </div>
      </section>

      {/* Sticky Submenu */}
      <nav className="services-submenu">
        <div className="container">
          <div className="submenu-track">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`submenu-item ${activeSection === item.id ? 'submenu-active' : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* CSP Banner — white background, between submenu and first section */}
      <section className="services-csp-banner">
        <div className="container">
          <img src={`${base}images/csp-logo.svg`} alt="Crestron Services Provider" className="services-csp-banner-logo" />
        </div>
      </section>

      {/* ===== INDIVIDUAL SERVICE SECTIONS ===== */}
      {services.main_services.map((service, svcIndex) => {
        const IconComp = iconMap[service.icon];
        const isEven = svcIndex % 2 === 0;

        return (
          <div key={service.id}>
            {/* Service Header + Details */}
            <section
              id={service.id}
              ref={(el) => (sectionRefs.current[service.id] = el)}
              className={`section service-block ${isEven ? 'service-block-dark' : 'service-block-light'}`}
            >
              <div className="container">
                <motion.div
                  className="service-detail-grid"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div className="service-detail-content" variants={itemVariants}>
                    <div className="service-detail-icon-header">
                      {IconComp && <div className="service-detail-icon"><IconComp size={32} /></div>}
                      <h2>{service.page_title || service.title}</h2>
                    </div>
                    {service.subtitle && (
                      <p className="service-detail-subtitle">{service.subtitle}</p>
                    )}
                    <p className="service-detail-desc">{(service.long_description || service.details).split('\n\n').map((p, i, arr) => (
                      <span key={i}>{p}{i < arr.length - 1 && <><br /><br /></>}</span>
                    ))}</p>

                    {service.features && (
                      <div className="service-features">
                        <h3>{t('services.what_we_offer')}</h3>
                        <div className="features-list">
                          {service.features.map((feature, i) => (
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
                    {service.bullets_left && (
                      <div className="sidebar-card">
                        <h4>{t('services.key_capabilities')}</h4>
                        <ul>
                          {[...(service.bullets_left || []), ...(service.bullets_right || [])].map((item, i) => (
                            <li key={i}><CheckCircle size={14} /> {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {service.technologies && (
                      <div className="sidebar-card">
                        <h4>{t('services.technologies')}</h4>
                        <div className="tech-tags">
                          {service.technologies.map((tech, i) => (
                            <span key={i} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Interfaces Gallery */}
            {service.interfaces_gallery && (
              <section className="section service-interfaces">
                <div className="container">
                  <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <motion.h2 variants={itemVariants}>{service.interfaces_gallery.title}</motion.h2>
                    <motion.p className="section-description" variants={itemVariants}>
                      {service.interfaces_gallery.subtitle}
                    </motion.p>
                    <motion.div className="interfaces-grid" variants={itemVariants}>
                      {service.interfaces_gallery.items.map((item, i) => (
                        <div
                          key={i}
                          className="interface-card"
                          onClick={() => setLightbox({ open: true, images: service.interfaces_gallery.items, index: i })}
                        >
                          <img src={`${base}${item.src.replace(/^\//, '')}`} alt={item.alt} loading="lazy" />
                          <div className="interface-caption">{item.caption}</div>
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </section>
            )}
          </div>
        );
      })}

      {/* ===== CRESTRON SPECIALIST ===== */}
      <section
        id="crestron"
        ref={(el) => (sectionRefs.current['crestron'] = el)}
        className="section crestron-section"
      >
        <div className="container">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="crestron-header">
              <motion.h2 variants={itemVariants} className="section-title-left">
                {services.crestron_section.title}
              </motion.h2>
              {services.crestron_section.show_csp_logo && (
                <motion.div className="crestron-csp-badge" variants={itemVariants}>
                  <img src={`${base}images/csp-logo.svg`} alt="Crestron Services Provider" />
                </motion.div>
              )}
            </div>
            <motion.p variants={itemVariants} className="crestron-description">
              {services.crestron_section.description}
            </motion.p>
            <motion.div className="capabilities-grid" variants={containerVariants}>
              {services.crestron_section.capabilities.map((capability, index) => (
                <motion.div key={index} className="capability-item" variants={itemVariants} whileHover={{ x: 5 }}>
                  <span className="capability-check">&#10003;</span>
                  <span>{capability}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== BROCHURE (CSP — moved here, right after Crestron Specialist) ===== */}
      {services.main_services[0]?.brochure_download && (
        <section className="section service-brochure">
          <div className="container">
            <motion.div className="brochure-card" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div className="brochure-content" variants={itemVariants}>
                <Download size={28} className="section-icon" />
                <div>
                  <h3>{services.main_services[0].brochure_download.title}</h3>
                  <p>{services.main_services[0].brochure_download.description}</p>
                </div>
              </motion.div>
              <motion.a
                href={
                  services.main_services[0].brochure_download.file_url.startsWith('http')
                    ? services.main_services[0].brochure_download.file_url
                    : `${base}${services.main_services[0].brochure_download.file_url.replace(/^\//, '')}`
                }
                className="btn btn-primary brochure-btn"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
              >
                <Download size={16} /> {services.main_services[0].brochure_download.button_text}
              </motion.a>
            </motion.div>
          </div>
        </section>
      )}

      {/* ===== AI-AV BRIDGE (shared) ===== */}
      <section
        id="ai-bridge"
        ref={(el) => (sectionRefs.current['ai-bridge'] = el)}
        className="section service-ai-bridge"
      >
        <div className="container">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={itemVariants}>{t('services.ai_bridge')}</motion.h2>
            {services.main_services[0]?.ai_bridge_section?.subtitle && (
              <motion.p className="service-detail-subtitle" variants={itemVariants}>
                {services.main_services[0].ai_bridge_section.subtitle}
              </motion.p>
            )}
            <motion.div className="ai-bridge-description" variants={itemVariants}>
              {(services.main_services[0]?.ai_bridge_section?.description || '').split('\n\n').map((p, i, arr) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>
            {services.main_services[0]?.ai_bridge_section?.features && (
              <div className="service-features">
                <h3>{t('services.what_we_offer')}</h3>
                <div className="features-list">
                  {services.main_services[0].ai_bridge_section.features.map((feature, i) => (
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
        </div>
      </section>

      {/* ===== GLOBAL CERTIFICATIONS ===== */}
      {services.certifications_section && (
        <section
          id="certifications"
          ref={(el) => (sectionRefs.current['certifications'] = el)}
          className="section service-certifications"
        >
          <div className="container">
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div className="certifications-header" variants={itemVariants}>
                <Award size={28} className="section-icon" />
                <h2>{services.certifications_section.title}</h2>
              </motion.div>
              <motion.p className="section-description" variants={itemVariants}>
                {services.certifications_section.subtitle}
              </motion.p>
              <motion.div className="certifications-grid" variants={itemVariants}>
                {services.certifications_section.badges.map((badge, i) => (
                  <div key={i} className="certification-badge">
                    <img src={`${base}${badge.src.replace(/^\//, '')}`} alt={badge.name} loading="lazy" />
                    <span className="badge-name">{badge.name}</span>
                    <span className="badge-issuer">{badge.issuer}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ===== WARRANTY ===== */}
      {services.main_services[0]?.warranty_section && (
        <section className="section service-warranty">
          <div className="container">
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div className="warranty-header" variants={itemVariants}>
                <Shield size={28} className="section-icon" />
                <h2>{services.main_services[0].warranty_section.title}</h2>
              </motion.div>
              <motion.div className="warranty-items" variants={itemVariants}>
                {services.main_services[0].warranty_section.items.map((item, i) => (
                  <div key={i} className="warranty-item">
                    <CheckCircle size={16} className="feature-check" />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className="section services-cta-section">
        <div className="container text-center">
          <h2>{t('services.need_help')}</h2>
          <p>{t('services.cta_text')}</p>
          <Link to="/contact" className="btn btn-primary">
            <Mail size={16} /> {t('nav.contact')}
          </Link>
        </div>
      </section>

      <ImageLightbox
        isOpen={lightbox.open}
        images={lightbox.images}
        currentIndex={lightbox.index}
        onClose={() => setLightbox({ open: false, images: [], index: 0 })}
        onPrev={() => setLightbox((s) => ({ ...s, index: (s.index - 1 + s.images.length) % s.images.length }))}
        onNext={() => setLightbox((s) => ({ ...s, index: (s.index + 1) % s.images.length }))}
      />
    </>
  );
}
