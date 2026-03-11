import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useContent, useLanguage, useT } from '../context/LanguageContext';
import './Header.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { content } = useContent();
  const { language, setLanguage } = useLanguage();
  const t = useT();
  const location = useLocation();
  const { services } = content;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const toggleLang = () => setLanguage(language === 'fr' ? 'en' : 'fr');

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <span className="logo-text">JPrunier</span>
            <span className="logo-subtitle">AI-AV</span>
          </Link>

          <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
            <Link
              to="/about"
              className={`nav-link ${isActive('/about') ? 'nav-active' : ''}`}
              onClick={closeMobileMenu}
            >
              {t('nav.about')}
            </Link>

            <div className="nav-dropdown">
              <Link
                to="/services"
                className={`nav-link nav-link-dropdown ${isActive('/services') ? 'nav-active' : ''}`}
                onClick={closeMobileMenu}
              >
                {t('nav.services')} <ChevronDown size={14} className="dropdown-chevron" />
              </Link>
              <div className="dropdown-menu">
                {services.main_services.map((service) => (
                  <Link
                    key={service.id}
                    to={`/services#${service.id}`}
                    className="dropdown-item"
                    onClick={closeMobileMenu}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/news"
              className={`nav-link ${isActive('/news') ? 'nav-active' : ''}`}
              onClick={closeMobileMenu}
            >
              {t('nav.news')}
            </Link>

            {/* Mobile-only: contact + lang inside menu */}
            <div className="mobile-nav-extras">
              <Link to="/contact" className="nav-link" onClick={closeMobileMenu}>
                {t('nav.contact')}
              </Link>
              <button className="mobile-lang-btn" onClick={toggleLang}>
                <Globe size={16} />
                {language === 'fr' ? 'English' : 'Français'}
              </button>
            </div>
          </nav>

          <div className="header-right">
            <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle language">
              <Globe size={15} />
              <span>{language === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            <Link to="/contact" className="header-cta" onClick={closeMobileMenu}>
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
  );
}
