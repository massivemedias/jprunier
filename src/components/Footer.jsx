import { Link, useLocation } from 'react-router-dom';
import { Github, Mail, Phone, MapPin } from 'lucide-react';
import { useContent, useT } from '../context/LanguageContext';
import './Footer.css';

const base = import.meta.env.BASE_URL;

const certifications = [
  { src: 'images/certifications/crestron-cmpg.webp', name: 'Crestron Masters Certified Programmer' },
  { src: 'images/certifications/qsys-level_2.webp', name: 'Q-SYS Level 2' },
  { src: 'images/certifications/qsys-control_201.webp', name: 'Q-SYS Control 201' },
  { src: 'images/certifications/qsys-reflect_enterprise_manager.webp', name: 'Q-SYS Reflect Enterprise Manager' },
];

export default function Footer() {
  const { content } = useContent();
  const t = useT();
  const { company } = content;
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {/* CTA section — only on non-home pages */}
      {!isHome && (
        <section className="footer-cta-section">
          <div className="container">
            <div className="footer-cta-content">
              <h2>{content.home.cta_section.title}</h2>
              <p>{content.home.cta_section.subtitle}</p>
              <Link to="/contact" className="btn btn-primary">
                {content.home.cta_section.button}
              </Link>
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="container">
          {/* Main footer grid */}
          <div className="footer-grid">
            {/* Column 1: Brand + Contact */}
            <div className="footer-col">
              <Link to="/" className="footer-logo">
                <span className="footer-logo-text">JPrunier</span>
                <span className="footer-logo-subtitle">AI-AV</span>
              </Link>

              <div className="footer-contact-block">
                <div className="footer-office">
                  <span className="footer-office-city">Montreal</span>
                  <span className="footer-contact-line">
                    <MapPin size={12} /> {company.offices.montreal.address}
                  </span>
                </div>
                <div className="footer-office">
                  <span className="footer-office-city">Paris</span>
                  <span className="footer-contact-line">
                    <MapPin size={12} /> {company.offices.paris.address}
                  </span>
                </div>
                <div className="footer-contact-info">
                  <a href={`tel:${company.offices.montreal.phone}`} className="footer-contact-line footer-link">
                    <Phone size={12} /> {company.offices.montreal.phone}
                  </a>
                  <a href={`mailto:${company.social.email}`} className="footer-contact-line footer-link">
                    <Mail size={12} /> {company.social.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Quick links */}
            <div className="footer-col footer-col-links">
              <Link to="/services" className="footer-nav-link">{t('nav.services')}</Link>
              <Link to="/news" className="footer-nav-link">{t('nav.news')}</Link>
              <Link to="/contact" className="footer-nav-link">{t('nav.contact')}</Link>
            </div>

            {/* Column 3: Certifications */}
            <div className="footer-col footer-col-certs">
              <span className="footer-col-title">{t('services.certifications')}</span>
              <div className="footer-certs">
                {certifications.map((cert, i) => (
                  <img key={i} src={`${base}${cert.src}`} alt={cert.name} className="footer-cert-badge" />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <p className="footer-copy">
              &copy; 2026 {company.name} {t('footer.rights')}
            </p>
            <div className="footer-social">
              <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href={company.social.github} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                <Github size={16} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
