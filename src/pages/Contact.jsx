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
    _honey: '', // honeypot - bots fill this, humans leave empty
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check - bots fill this field, real users don't
    if (formData._honey) return;

    setStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/info@jprunier.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          _subject: `New contact from ${formData.name} — jprunier.com`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      if (!res.ok) throw new Error('submit failed');
      setFormData({ name: '', email: '', phone: '', company: '', message: '', _honey: '' });
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const offices = [
    {
      key: 'montreal',
      label: t('contact.montreal_office'),
      data: company.offices.montreal,
      accent: 'accent-violet',
      // Derive the map query from the live address so Jerome's edits in Sanity
      // update both the card AND the Google Maps pin at the same time.
      mapQuery: `${company.offices.montreal.address}, ${company.offices.montreal.city}, ${company.offices.montreal.country}`,
    },
    {
      key: 'paris',
      label: t('contact.paris_office'),
      data: company.offices.paris,
      accent: 'accent-blue',
      mapQuery: `${company.offices.paris.address}, ${company.offices.paris.city}, ${company.offices.paris.country}`,
    },
  ];

  return (
    <>
      <Hero
        title={hero.contact.title}
        subtitle={hero.contact.subtitle}
        backgroundImage={hero.contact.backgroundImage || `${base}images/bg-variante.png`}
        centered={true}
        compact={true}
      />

      {/* === Form left + Locations right === */}
      <section className="section contact-main-section">
        <div className="container">
          <div className="contact-split-grid">

            {/* LEFT: Form */}
            <motion.div
              className="contact-form-wrapper"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <h2>{t('contact.send_message')}</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">{t('contact.name')}</label>
                    <input type="text" id="name" name="name" value={formData.name}
                      onChange={handleChange} required placeholder={t('contact.name_placeholder')} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{t('contact.email')}</label>
                    <input type="email" id="email" name="email" value={formData.email}
                      onChange={handleChange} required placeholder={t('contact.email_placeholder')} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">{t('contact.phone')}</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone}
                      onChange={handleChange} placeholder={t('contact.phone_placeholder')} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">{t('contact.company')}</label>
                    <input type="text" id="company" name="company" value={formData.company}
                      onChange={handleChange} placeholder={t('contact.company_placeholder')} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t('contact.message')}</label>
                  <textarea id="message" name="message" value={formData.message}
                    onChange={handleChange} required placeholder={t('contact.message_placeholder')} rows="6" />
                </div>

                {/* Honeypot - hidden from humans, tempting for bots */}
                <input
                  type="text"
                  name="_honey"
                  value={formData._honey}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                  aria-hidden="true"
                />

                <button
                  type="submit"
                  className="btn btn-primary contact-submit-btn"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? t('contact.sending') : t('contact.submit')}
                </button>

                {status === 'success' && (
                  <p className="contact-form-message contact-form-success" role="status">
                    {t('contact.success')}
                  </p>
                )}
                {status === 'error' && (
                  <p className="contact-form-message contact-form-error" role="alert">
                    {t('contact.error')}
                  </p>
                )}
              </form>
            </motion.div>

            {/* RIGHT: Locations stacked */}
            <motion.div
              className="locations-column"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {offices.map((office) => (
                <motion.div key={office.key} className={`location-block ${office.accent}`} variants={itemVariants}>
                  <div className="location-card">
                    <h3>{office.label}</h3>
                    <div className="location-info-item">
                      <MapPin size={18} />
                      <span>{office.data.address}</span>
                    </div>
                    <div className="location-info-item">
                      <Phone size={18} />
                      <a href={`tel:${office.data.phone.replace(/\s/g,'')}`}>{office.data.phone}</a>
                    </div>
                    <div className="location-info-item">
                      <Mail size={18} />
                      <a href={`mailto:${office.data.email}`}>{office.data.email}</a>
                    </div>
                  </div>
                  <div className="location-map">
                    <iframe
                      title={`Map ${office.label}`}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
