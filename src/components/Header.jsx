import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useContent, useLanguage, useT } from '../context/LanguageContext';
import './Header.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('jprunier-theme');
    return saved ? saved === 'dark' : true;
  });
  const { content } = useContent();
  const { language, setLanguage } = useLanguage();
  const t = useT();
  const location = useLocation();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('jprunier-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const isActive = (path) => location.pathname === path;

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

            <Link
              to="/services"
              className={`nav-link ${isActive('/services') ? 'nav-active' : ''}`}
              onClick={closeMobileMenu}
            >
              {t('nav.services')}
            </Link>

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
              <div className="mobile-controls">
                <div className="lang-pill">
                  <button
                    className={`lang-option ${language === 'fr' ? 'lang-active' : ''}`}
                    onClick={() => setLanguage('fr')}
                  >
                    FR
                  </button>
                  <button
                    className={`lang-option ${language === 'en' ? 'lang-active' : ''}`}
                    onClick={() => setLanguage('en')}
                  >
                    EN
                  </button>
                </div>
                <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme">
                  {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
            </div>
          </nav>

          <div className="header-right">
            <div className="lang-pill">
              <button
                className={`lang-option ${language === 'fr' ? 'lang-active' : ''}`}
                onClick={() => setLanguage('fr')}
              >
                FR
              </button>
              <button
                className={`lang-option ${language === 'en' ? 'lang-active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
            </div>

            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
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
