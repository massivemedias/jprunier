'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ArrowLeft, Headphones, Code, Settings, BrainCircuit } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import '../../styles/NotFound.css'

const content = {
  en: {
    code: '404',
    title: 'Page not found',
    subtitle: 'The page you are looking for doesn\'t exist or has been moved.',
    home: 'Back to Home',
    back: 'Go Back',
    explore: 'Explore our services',
    services: [
      { icon: 'integration', label: 'AV Integration', href: '/services/integration' },
      { icon: 'programming', label: 'Programming', href: '/services/programming' },
      { icon: 'consulting', label: 'Consulting', href: '/services/consulting' },
      { icon: 'admin', label: 'Administration', href: '/services/administration' },
    ],
  },
  fr: {
    code: '404',
    title: 'Page introuvable',
    subtitle: 'La page que vous cherchez n\'existe pas ou a été déplacée.',
    home: 'Retour à l\'accueil',
    back: 'Retour',
    explore: 'Explorez nos services',
    services: [
      { icon: 'integration', label: 'Intégration AV', href: '/services/integration' },
      { icon: 'programming', label: 'Programmation', href: '/services/programming' },
      { icon: 'consulting', label: 'Consultation', href: '/services/consulting' },
      { icon: 'admin', label: 'Administration', href: '/services/administration' },
    ],
  },
}

function ServiceIcon({ type }: { type: string }) {
  const size = 22
  switch (type) {
    case 'integration': return <Headphones size={size} />
    case 'programming': return <Code size={size} />
    case 'consulting': return <BrainCircuit size={size} />
    case 'admin': return <Settings size={size} />
    default: return <Code size={size} />
  }
}

export default function NotFound() {
  const { language } = useLanguage()
  const t = content[language as keyof typeof content] || content.fr

  return (
    <div className="not-found-page">
      {/* Background effects */}
      <div className="not-found-glow not-found-glow-1" />
      <div className="not-found-glow not-found-glow-2" />

      <div className="not-found-container">
        {/* Big 404 */}
        <motion.div
          className="not-found-code-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="not-found-code">{t.code}</span>
        </motion.div>

        {/* Title & subtitle */}
        <motion.h1
          className="not-found-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t.title}
        </motion.h1>

        <motion.p
          className="not-found-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          {t.subtitle}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="not-found-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href="/" className="btn btn-primary not-found-btn">
            <Home size={18} />
            {t.home}
          </Link>
          <button onClick={() => window.history.back()} className="btn btn-secondary not-found-btn">
            <ArrowLeft size={18} />
            {t.back}
          </button>
        </motion.div>

        {/* Service links */}
        <motion.div
          className="not-found-services"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          <p className="not-found-services-title">{t.explore}</p>
          <div className="not-found-services-grid">
            {t.services.map((svc) => (
              <Link key={svc.href} href={svc.href} className="not-found-service-card">
                <div className="not-found-service-icon">
                  <ServiceIcon type={svc.icon} />
                </div>
                <span>{svc.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
