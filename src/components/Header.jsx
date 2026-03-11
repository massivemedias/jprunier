import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useContent, useLanguage, useT } from '../context/LanguageContext';
import './Header.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { content } = useContent();
  const { language, setLanguage } = useLanguage();
  const t = useT();
  const { services } = content;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <span className="logo-text">JPrunier</span>
            <span className="logo-subtitle">AI-AV</span>
          </Link>

          <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/about" className="nav-link" onClick={closeMobileMenu}>
              {t('nav.about')}
            </Link>

            <div className="nav-dropdown">
              <Link to="/services" className="nav-link nav-link-dropdown" onClick={closeMobileMenu}>
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

            <Link to="/contact" className="nav-link" onClick={closeMobileMenu}>
              {t('nav.contact')}
            </Link>
          </nav>

          <div className="header-right">
            <div className="lang-toggle">
              <button
                className={`lang-btn ${language === 'fr' ? 'lang-active' : ''}`}
                onClick={() => setLanguage('fr')}
              >
                FR
              </button>
              <span className="lang-sep">/</span>
              <button
                className={`lang-btn ${language === 'en' ? 'lang-active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
            </div>

            <Link to="/news" className="nav-news-btn" onClick={closeMobileMenu}>
              {t('nav.news')}
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
