'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Linkedin, Github, Mail } from 'lucide-react'
import { useLanguage, useT, useLocalizedData } from '../context/LanguageContext'
import './Footer.css'

type FooterData = {
  companyName: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
  social: { linkedin: string; github: string; email: string }
}

export default function Footer({
  dataEn,
  dataFr,
}: {
  dataEn: FooterData
  dataFr: FooterData
}) {
  const data = useLocalizedData(dataEn, dataFr)
  const t = useT()
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      {!isHome && (
        <section className="footer-cta-section">
          <div className="container">
            <div className="footer-cta-content">
              <h2>{data.ctaTitle}</h2>
              <p>{data.ctaSubtitle}</p>
              <Link href="/contact" className="btn btn-primary">
                {data.ctaButton}
              </Link>
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-social">
              <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href={data.social.github} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href={`mailto:${data.social.email}`} className="social-icon" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} {data.companyName}. {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
