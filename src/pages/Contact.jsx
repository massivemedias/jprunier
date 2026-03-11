import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import Hero from '../components/Hero';
import { useContent, useT } from '../context/LanguageContext';
import './Contact.css';

const base = import.meta.env.BASE_URL;

export default function Contact() {
  const { content } = useContent();
  const t = useT();
  const { hero, company } = content;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Form submission would be handled by backend
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    });
    alert(t('contact.success'));
  };

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
        title={hero.contact.title}
        subtitle={hero.contact.subtitle}
        backgroundImage={`${base}images/bg-variante.png`}
        centered={true}
        compact={true}
      />

      {/* Contact Form & Info Section */}
      <section className="section contact-section">
        <div className="container">
          <motion.div
            className="contact-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Contact Form */}
            <motion.div className="contact-form-wrapper" variants={itemVariants}>
              <h2>{t('contact.send_message')}</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">{t('contact.name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.name_placeholder')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{t('contact.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.email_placeholder')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">{t('contact.phone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('contact.phone_placeholder')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">{t('contact.company')}</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t('contact.company_placeholder')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t('contact.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.message_placeholder')}
                    rows="5"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  {t('contact.submit')}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div className="contact-info-wrapper" variants={itemVariants}>
              <div className="contact-info-section">
                <h3>{t('contact.montreal_office')}</h3>
                <div className="contact-info-item">
                  <MapPin size={24} />
                  <div>
                    <p className="info-label">{t('contact.address')}</p>
                    <p>{company.offices.montreal.address}</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <Phone size={24} />
                  <div>
                    <p className="info-label">{t('contact.phone')}</p>
                    <a href={`tel:${company.offices.montreal.phone}`}>
                      {company.offices.montreal.phone}
                    </a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <Mail size={24} />
                  <div>
                    <p className="info-label">{t('contact.email')}</p>
                    <a href={`mailto:${company.offices.montreal.email}`}>
                      {company.offices.montreal.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-info-section">
                <h3>{t('contact.paris_office')}</h3>
                <div className="contact-info-item">
                  <MapPin size={24} />
                  <div>
                    <p className="info-label">{t('contact.address')}</p>
                    <p>{company.offices.paris.address}</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <Phone size={24} />
                  <div>
                    <p className="info-label">{t('contact.phone')}</p>
                    <a href={`tel:${company.offices.paris.phone}`}>
                      {company.offices.paris.phone}
                    </a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <Mail size={24} />
                  <div>
                    <p className="info-label">{t('contact.email')}</p>
                    <a href={`mailto:${company.offices.paris.email}`}>
                      {company.offices.paris.email}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="section map-section">
        <div className="container">
          <h2 className="text-center">{t('contact.locations')}</h2>
          <div className="map-placeholder">
            <p>{t('contact.map_coming')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
