import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Lightbulb, Settings, Zap, CheckCircle, ArrowLeft, Mail } from 'lucide-react';
import Hero from '../components/Hero';
import { useContent, useT } from '../context/LanguageContext';
import './ServiceDetail.css';

const base = import.meta.env.BASE_URL;

const iconMap = { Code, Lightbulb, Settings, Zap };

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const { content } = useContent();
  const t = useT();
  const { services } = content;

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
    </>
  );
}
