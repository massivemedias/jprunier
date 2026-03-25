import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Compass, LayoutDashboard, Wrench, ChevronDown, ChevronUp, Shield, Award, GraduationCap, Mail, LayoutGrid, Link2, MessageCircle } from 'lucide-react';
import Hero from '../components/Hero';
import { useContent, useT } from '../context/LanguageContext';
import './Home.css';

const base = import.meta.env.BASE_URL;

export default function Home() {
  const { content } = useContent();
  const t = useT();
  const { hero, home, services, sectors } = content;
  const [expandedAccordion, setExpandedAccordion] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const iconMap = { Code, Compass, LayoutDashboard, Wrench };
  const accordionIcons = { grid: LayoutGrid, link: Link2, chat: MessageCircle };
  const expertiseIcons = [Shield, Award, GraduationCap];

  /* Industries keywords for the sectors section */
  const industries = [
    { en: 'Corporate headquarters and modern workplaces', fr: 'Sièges sociaux et espaces de travail modernes' },
    { en: 'Legal and professional service firms', fr: 'Cabinets juridiques et de services professionnels' },
    { en: 'Financial and investment institutions', fr: 'Institutions financières et d\'investissement' },
    { en: 'Government and public sector organizations', fr: 'Organisations gouvernementales et du secteur public' },
    { en: 'Technology and innovation environments', fr: 'Environnements technologiques et d\'innovation' },
    { en: 'Smart buildings and connected infrastructures', fr: 'Bâtiments intelligents et infrastructures connectées' },
    { en: 'International AV and technology deployments', fr: 'Déploiements AV et technologiques internationaux' },
  ];

  return (
    <>
      {/* 1. HERO */}
      <Hero
        title={hero.home.title}
        subtitle={hero.home.subtitle}
        backgroundImage={`${base}images/bg-bubbles.png`}
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
            <h2>{home.gateway.title}</h2>
            <p className="gateway-subtitle">{home.gateway.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* 3. TECHNOLOGIES WE INTEGRATE — Conveyor belt carousel */}
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
          <div className="partners-carousel-wrapper">
            <div className="partners-carousel-track">
              {/* Duplicate logos for infinite scroll effect */}
              {[...home.tech_partners, ...home.tech_partners].map((partner, index) => (
                <div key={index} className="partner-logo-light">
                  <img src={`${base}${partner.logo.replace(/^\//, '')}`} alt={partner.name} className="partner-logo-img-dark" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGY SERVICES */}
      <section className="section services-home-section" style={{ backgroundImage: `url(${base}images/hero-bg.png)` }}>
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

          {/* Services in 2x2 grid */}
          <motion.div
            className="services-grid-2x2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.main_services.map((service) => {
              const IconComp = iconMap[service.icon];
              return (
                <motion.div key={service.id} variants={itemVariants}>
                  <Link to={`/services#${service.id}`} className="service-card-small glass-card">
                    <div className="service-small-icon">{IconComp && <IconComp size={24} />}</div>
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4b. AUDIOVISUAL EXPERTISE */}
      {services.main_services[0]?.audiovisual_section && (
        <section className="section audiovisual-home-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="av-expertise-title">{services.main_services[0].audiovisual_section.title}</h2>
              <p className="av-expertise-desc">{services.main_services[0].audiovisual_section.description}</p>
              <div className="av-expertise-domains">
                {services.main_services[0].audiovisual_section.domains.map((domain, i) => (
                  <span key={i} className="av-domain-tag">{domain}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 5. AI & AV CONVERGENCE */}
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
              <p className="aiav-desc">{t('home.ai_av_desc')}</p>
            </div>
            <div className="aiav-image">
              <img src={`${base}images/icon-connection.png`} alt="AI AV Connection" />
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
            {home.connecting_items.map((item, index) => {
              const AccIcon = accordionIcons[item.icon];
              const isOpen = expandedAccordion === index;
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
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 7. EXPERTISE YOU CAN TRUST */}
      <section className="section-light expertise-home-section" style={{ backgroundImage: `url(${base}images/bg-ia-av-spheres.jpg)` }}>
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
            {home.expertise_items.map((item, index) => {
              const ExIcon = expertiseIcons[index];
              return (
                <motion.div key={index} className="expertise-home-item" variants={itemVariants}>
                  <div className="expertise-icon-circle">{ExIcon && <ExIcon size={24} />}</div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 8. CTA BANNER */}
      <section className="cta-banner-section">
        <div className="container">
          <motion.div
            className="cta-banner-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>{t('home.questions')}</h2>
            <Link to="/contact" className="btn-cta-outline">
              <Mail size={18} /> {t('home.email_us')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 9. ACTIVE ACROSS MULTIPLE INDUSTRIES */}
      <section className="section sectors-home-section">
        <div className="container">
          <motion.div
            className="sectors-centered"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="sectors-title-centered">{t('home.sectors_title')}</h2>
            <div className="industries-keywords">
              {industries.map((item, index) => (
                <span key={index} className="industry-keyword">{item.en}</span>
              ))}
            </div>
            <p className="sectors-footer-text">{t('home.sectors_footer')}</p>
          </motion.div>
        </div>
      </section>

      {/* 10. DISCOVER CTA */}
      <section
        className="discover-cta-section"
        style={{ backgroundImage: `url(${base}images/bg-variante.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="discover-overlay"></div>
        <motion.div
          className="discover-content container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>{home.discover_cta.title}</h2>
          <p>{home.discover_cta.subtitle}</p>
          <Link to="/contact" className="btn btn-primary">{home.discover_cta.button}</Link>
        </motion.div>
      </section>
    </>
  );
}
