'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import Hero from '../../../components/Hero'
import { useLocalizedData, useT } from '../../../context/LanguageContext'
import '../../../styles/Contact.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
}

export default function ContactClient({
  pageEn, pageFr, settingsEn, settingsFr,
}: {
  pageEn: any; pageFr: any; settingsEn: any; settingsFr: any
}) {
  const page = useLocalizedData(pageEn, pageFr)
  const settings = useLocalizedData(settingsEn, settingsFr)
  const t = useT()
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Failed')
      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
      setSent(true)
      setTimeout(() => setSent(false), 5000)
    } catch {
      setError(t('contact.error') || 'An error occurred. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const offices = settings.offices || []

  return (
    <>
      <Hero
        title={page.hero?.title || ''}
        subtitle={page.hero?.subtitle || ''}
        backgroundImage="/images/bg-variante.png"
        centered
        compact
      />

      <section className="section contact-section">
        <div className="container">
          <motion.div
            className="contact-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div className="contact-form-wrapper" variants={itemVariants}>
              <h2>{t('contact.send_message')}</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">{t('contact.name')}</label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name} onChange={handleChange}
                    required placeholder={t('contact.name_placeholder')}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t('contact.email')}</label>
                  <input
                    type="email" id="email" name="email"
                    value={formData.email} onChange={handleChange}
                    required placeholder={t('contact.email_placeholder')}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{t('contact.phone')}</label>
                  <input
                    type="tel" id="phone" name="phone"
                    value={formData.phone} onChange={handleChange}
                    placeholder={t('contact.phone_placeholder')}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">{t('contact.company')}</label>
                  <input
                    type="text" id="company" name="company"
                    value={formData.company} onChange={handleChange}
                    placeholder={t('contact.company_placeholder')}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">{t('contact.message')}</label>
                  <textarea
                    id="message" name="message"
                    value={formData.message} onChange={handleChange}
                    required placeholder={t('contact.message_placeholder')}
                    rows={5}
                  />
                </div>
                {sent && <p className="form-success">{t('contact.success')}</p>}
                {error && <p className="form-error">{error}</p>}
                <button type="submit" className="btn btn-primary" disabled={sending}>
                  {sending ? '...' : t('contact.submit')}
                </button>
              </form>
            </motion.div>

            <motion.div className="contact-info-wrapper" variants={itemVariants}>
              {offices.map((office: any, index: number) => (
                <div key={index} className="contact-info-section">
                  <h3>{office.city}{office.country ? `, ${office.country}` : ''}</h3>
                  {office.address && (
                    <div className="contact-info-item">
                      <MapPin size={24} />
                      <div>
                        <p className="info-label">{t('contact.address')}</p>
                        <p>{office.address}</p>
                      </div>
                    </div>
                  )}
                  {office.phone && (
                    <div className="contact-info-item">
                      <Phone size={24} />
                      <div>
                        <p className="info-label">{t('contact.phone')}</p>
                        <a href={`tel:${office.phone}`}>{office.phone}</a>
                      </div>
                    </div>
                  )}
                  {office.email && (
                    <div className="contact-info-item">
                      <Mail size={24} />
                      <div>
                        <p className="info-label">{t('contact.email')}</p>
                        <a href={`mailto:${office.email}`}>{office.email}</a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section map-section">
        <div className="container">
          <h2 className="text-center">{t('contact.locations')}</h2>
          <div className="map-placeholder">
            <p>{t('contact.map_coming')}</p>
          </div>
        </div>
      </section>
    </>
  )
}
