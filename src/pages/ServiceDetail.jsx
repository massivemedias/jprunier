import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Lightbulb, Settings, Zap, CheckCircle, ArrowLeft, Mail, Download, Award, Shield } from 'lucide-react';
import Hero from '../components/Hero';
import ImageLightbox from '../components/ImageLightbox';
import { useContent, useT } from '../context/LanguageContext';
import './ServiceDetail.css';

const base = import.meta.env.BASE_URL;

const iconMap = { Code, Lightbulb, Settings, Zap };

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const { content } = useContent();
  const t = useT();
  const { services } = content;
  const [lightbox, setLightbox] = useState({ open: false, src: '', alt: '' });

  const service = services.main_services.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="service-not-found">
        <h2>{t('services.not_found')}</h2>
        <Link to="/services" className="btn btn-primary">{t('services.back')}</Link>
      </div>
    );
  }

  const IconComp = iconMap[service.icon];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <>
      <Hero
        title={service.title}
        subtitle={service.description}
        backgroundImage={`${base}images/bg-ai-generated.png`}
        centered={true}
        compact={true}
      />

      {/* Breadcrumb */}
      <section className="service-detail-breadcrumb">
        <div className="container">
          <Link to="/services" className="breadcrumb-link">
            <ArrowLeft size={16} /> {t('services.back')}
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="section service-detail-main">
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
              <p className="service-detail-desc">{service.long_description || service.details}</p>

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

              <div className="sidebar-cta">
                <h4>{t('services.need_help')}</h4>
                <p>{t('services.cta_text')}</p>
                <Link to="/contact" className="btn btn-primary">
                  <Mail size={16} /> {t('nav.contact')}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Audiovisual Section (programming only) */}
      {service.audiovisual_section && (
        <section className="section service-audiovisual">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={itemVariants}>{service.audiovisual_section.title}</motion.h2>
              <motion.p className="section-description" variants={itemVariants}>
                {service.audiovisual_section.description}
              </motion.p>
              <motion.div className="audiovisual-domains" variants={itemVariants}>
                {service.audiovisual_section.domains.map((domain, i) => (
                  <span key={i} className="domain-tag">{domain}</span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Extended Programming Services */}
      {service.extended_programming && (
        <section className="section service-extended-programming">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={itemVariants}>{service.extended_programming.title}</motion.h2>
              <motion.div className="extended-services-list" variants={itemVariants}>
                {service.extended_programming.items.map((item, i) => (
                  <div key={i} className="extended-service-item">
                    <CheckCircle size={16} className="feature-check" />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>
              <motion.p className="extended-languages" variants={itemVariants}>
                {service.extended_programming.languages}
              </motion.p>
            </motion.div>
          </div>
        </section>
      )}

      {/* AI Bridge Section */}
      {service.ai_bridge_section && (
        <section className="section service-ai-bridge">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={itemVariants}>{service.ai_bridge_section.title}</motion.h2>
              <motion.p className="ai-bridge-tagline" variants={itemVariants}>
                {service.ai_bridge_section.tagline}
              </motion.p>
              <motion.p className="section-description" variants={itemVariants}>
                {service.ai_bridge_section.description}
              </motion.p>
              <motion.div className="ai-bridge-capabilities" variants={itemVariants}>
                {service.ai_bridge_section.capabilities.map((cap, i) => (
                  <div key={i} className="ai-bridge-capability">
                    <CheckCircle size={16} className="feature-check" />
                    <span>{cap}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Interfaces Gallery */}
      {service.interfaces_gallery && (
        <section className="section service-interfaces">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={itemVariants}>{service.interfaces_gallery.title}</motion.h2>
              <motion.p className="section-description" variants={itemVariants}>
                {service.interfaces_gallery.subtitle}
              </motion.p>
              <motion.div className="interfaces-grid" variants={itemVariants}>
                {service.interfaces_gallery.items.map((item, i) => (
                  <div
                    key={i}
                    className="interface-card"
                    onClick={() => setLightbox({ open: true, src: item.src, alt: item.alt })}
                  >
                    <img
                      src={`${base}${item.src.replace(/^\//, '')}`}
                      alt={item.alt}
                      loading="lazy"
                    />
                    <div className="interface-caption">{item.caption}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {service.certifications_section && (
        <section className="section service-certifications">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="certifications-header" variants={itemVariants}>
                <Award size={28} className="section-icon" />
                <h2>{service.certifications_section.title}</h2>
              </motion.div>
              <motion.p className="section-description" variants={itemVariants}>
                {service.certifications_section.subtitle}
              </motion.p>
              <motion.div className="certifications-grid" variants={itemVariants}>
                {service.certifications_section.badges.map((badge, i) => (
                  <div key={i} className="certification-badge">
                    <img
                      src={`${base}${badge.src.replace(/^\//, '')}`}
                      alt={badge.name}
                      loading="lazy"
                    />
                    <span className="badge-name">{badge.name}</span>
                    <span className="badge-issuer">{badge.issuer}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Warranty */}
      {service.warranty_section && (
        <section className="section service-warranty">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="warranty-header" variants={itemVariants}>
                <Shield size={28} className="section-icon" />
                <h2>{service.warranty_section.title}</h2>
              </motion.div>
              <motion.div className="warranty-items" variants={itemVariants}>
                {service.warranty_section.items.map((item, i) => (
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

      {/* Brochure Download */}
      {service.brochure_download && (
        <section className="section service-brochure">
          <div className="container">
            <motion.div
              className="brochure-card"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="brochure-content" variants={itemVariants}>
                <Download size={28} className="section-icon" />
                <div>
                  <h3>{service.brochure_download.title}</h3>
                  <p>{service.brochure_download.description}</p>
                </div>
              </motion.div>
              <motion.a
                href={`${base}${service.brochure_download.file_url.replace(/^\//, '')}`}
                className="btn btn-primary brochure-btn"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
              >
                <Download size={16} /> {service.brochure_download.button_text}
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
            viewport={{ once: true }}
          >
            {services.main_services
              .filter((s) => s.id !== serviceId)
              .map((s) => {
                const OtherIcon = iconMap[s.icon];
                return (
                  <motion.div key={s.id} variants={itemVariants}>
                    <Link to={`/services/${s.id}`} className="other-service-card">
                      {OtherIcon && <OtherIcon size={24} className="other-service-icon" />}
                      <h4>{s.title}</h4>
                      <p>{s.description}</p>
                    </Link>
                  </motion.div>
                );
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
  );
}
