import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Lightbulb, Settings, Zap, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import { useContent, useT } from '../context/LanguageContext';
import './Services.css';

const base = import.meta.env.BASE_URL;
const iconMap = { Code, Lightbulb, Settings, Zap };

export default function Services() {
  const { content } = useContent();
  const t = useT();
  const { hero, services } = content;

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
      <Hero
        title={hero.services.title}
        subtitle={hero.services.subtitle}
        backgroundImage={`${base}images/bg-ai-generated.png`}
        centered={true}
        compact={true}
      />

      {/* Services Intro Section */}
      <section className="section services-intro-section">
        <div className="container">
          <p className="intro-text">{services.intro}</p>
        </div>
      </section>

      {/* Main Services Cards */}
      <section className="section main-services-section">
        <div className="container">
          <motion.div
            className="services-cards-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {services.main_services.map((service) => {
              const IconComp = iconMap[service.icon];
              return (
                <motion.div key={service.id} variants={itemVariants}>
                  <Link to={`/services/${service.id}`} className="service-link-card">
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
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Crestron Specialist Section */}
      <section className="section crestron-section">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 variants={itemVariants} className="section-title-left">
              {services.crestron_section.title}
            </motion.h2>
            <motion.p variants={itemVariants} className="crestron-description">
              {services.crestron_section.description}
            </motion.p>

            <motion.div className="capabilities-grid" variants={containerVariants}>
              {services.crestron_section.capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  className="capability-item"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <span className="capability-check">&#10003;</span>
                  <span>{capability}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Expertise Section */}
      <section className="section expertise-section">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 variants={itemVariants} className="section-title">
              {services.expertise.title}
            </motion.h2>

            <motion.div className="expertise-grid" variants={containerVariants}>
              {services.expertise.categories.map((category, index) => (
                <motion.div
                  key={index}
                  className="expertise-category"
                  variants={itemVariants}
                >
                  <h3>{category.name}</h3>
                  <ul>
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <span className="expertise-dot">&bull;</span>
                        {item}
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
  );
}
