'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Globe, Sun, Moon } from 'lucide-react'
import { useLanguage, useT, useLocalizedData } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import './Header.css'

type Service = { slug: string; title: string }

export default function Header({
  servicesEn,
  servicesFr,
}: {
  servicesEn: Service[]
  servicesFr: Service[]
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { language, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const t = useT()
  const pathname = usePathname()
  const services = useLocalizedData(servicesEn, servicesFr)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const isActive = (path: string) => pathname === path

  const toggleLang = () => setLanguage(language === 'fr' ? 'en' : 'fr')

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo" onClick={closeMobileMenu}>
            <span className="logo-text">JPrunier</span>
            <span className="logo-subtitle">AI-AV</span>
          </Link>

          <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
            <Link
              href="/about"
              className={`nav-link ${isActive('/about') ? 'nav-active' : ''}`}
              onClick={closeMobileMenu}
            >
              {t('nav.about')}
            </Link>

            <div className="nav-dropdown">
              <Link
                href="/services"
                className={`nav-link nav-link-dropdown ${isActive('/services') ? 'nav-active' : ''}`}
                onClick={closeMobileMenu}
              >
                {t('nav.services')} <ChevronDown size={14} className="dropdown-chevron" />
              </Link>
              <div className="dropdown-menu">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="dropdown-item"
                    onClick={closeMobileMenu}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/news"
              className={`nav-link ${isActive('/news') ? 'nav-active' : ''}`}
              onClick={closeMobileMenu}
            >
              {t('nav.news')}
            </Link>

            <div className="mobile-nav-extras">
              <Link href="/contact" className="nav-link" onClick={closeMobileMenu}>
                {t('nav.contact')}
              </Link>
              <button className="mobile-lang-btn" onClick={toggleLang}>
                <Globe size={16} />
                {language === 'fr' ? 'English' : 'Français'}
              </button>
              <button className="mobile-lang-btn" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </button>
            </div>
          </nav>

          <div className="header-right">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle language">
              <Globe size={15} />
              <span>{language === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            <Link href="/contact" className="header-cta" onClick={closeMobileMenu}>
              {t('nav.contact')}
            </Link>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}
